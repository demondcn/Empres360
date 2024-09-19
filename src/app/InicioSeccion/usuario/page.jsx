// pages/User.jsx
"use client";
import React, { useEffect, useState } from 'react';
import ISUMDiagnosticInterface from '@/components/ISUMDiagnosticInterface';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const UserContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;


  const [hasCompanies, setHasCompanies] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserCompanies = async () => {
      try {
        const response = await fetch('/api/checkUserHasCompanies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        setHasCompanies(data.hasCompanies);
      } catch (error) {
        console.error('Error checking user companies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      checkUserCompanies();
    }
  }, [userId]);

  const handleNewDiagnostic = () => {
    router.push(`/InicioSeccion/usuario/diagnostico`);
  };

  const handleViewDiagnostics = () => {
    router.push(`/InicioSeccion/usuario/diagnosticos`);
  };

  const handleRegisterEmpress = () => {
    router.push(`/InicioSeccion/AutorizedDates`);
  };

  return (
    <main>
      <Navbar userId={userId} />
      <ISUMDiagnosticInterface
        onNewDiagnostic={handleNewDiagnostic}
        onViewDiagnostics={handleViewDiagnostics}
        onRegister={handleRegisterEmpress}
        hasCompanies={hasCompanies}
        loading={loading}
      />
    </main>
  );
};

export default UserContent;
