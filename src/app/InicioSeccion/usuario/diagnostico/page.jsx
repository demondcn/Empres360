"use client";
import React, { Suspense } from 'react';
import ConceptualizacionAreasFunc from '@/components/ConceptualizacionAreasFunc';
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';

const DiagnosticContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Obtén el userId de la URL
  const diagnosticId = searchParams.get('id');
  const testId = 1;
  const BotonRespuesta = async () => {
    // Redirige a la página específica con el userId en la URL
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnosisId: diagnosticId, number: testId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create test');
      }

      // Obtener el nuevo test del cuerpo de la respuesta
      const { id } = await response.json();

      // Redirigir a la página específica con el ID del nuevo test
      router.push(`/InicioSeccion/usuario/diagnostico/d${testId}?diagnosisId=${diagnosticId}&userId=${userId}&testId=${id}`);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <>
    <Navbar userId={userId}/>
    <main>
      <ConceptualizacionAreasFunc
        userId={userId} 
        Navigate={BotonRespuesta}  
      />
    </main>
    </>
  );
}

export default function Diagnostic() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiagnosticContent />
    </Suspense>
  );
}
