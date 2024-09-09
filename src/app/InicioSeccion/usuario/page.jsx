"use client";
// pages/User.jsx
import React, { Suspense } from 'react';
import ISUMDiagnosticInterface from '@/components/ISUMDiagnosticInterface';
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";


const UserContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  //const userId = searchParams.get('userId');

  const status = 'Pending';
  const createdAt = new Date();

  const handleNewDiagnostic = async () => {
    try {
      const response = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, status, createdAt }),
      });

      if (!response.ok) {
        throw new Error('Failed to create diagnostic');
      }

      const { id } = await response.json();

      // Redirect to the diagnostics page after creating the diagnostic
      router.push(`/InicioSeccion/usuario/diagnostico?id=${id}`);
    } catch (error) {
      console.error('Error creating diagnostic:', error);
    }
  };
  const handleViewDiagnostics = () => {
    router.push(`/InicioSeccion/usuario/diagnosticos`); 
  };

  return (
  <>
    <Navbar userId={userId}/>
    <main>
      <ISUMDiagnosticInterface 
        onNewDiagnostic={handleNewDiagnostic}
        onViewDiagnostics={handleViewDiagnostics}
      />
    </main>
    </>
  );
}

export default function User() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserContent />
    </Suspense>
  );
}
