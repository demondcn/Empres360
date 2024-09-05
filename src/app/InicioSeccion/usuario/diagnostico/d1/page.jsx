"use client";
import React from 'react';
import CuestionarioVentasMark from '@/components/CuestionarioVentasMark'
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Di1() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('testId');
  const number = 2;
  const diagnosisId = searchParams.get('diagnosisId');
  const userId = searchParams.get('userId');
  const router = useRouter();

  const handleNavigation = async (average) => {

    const responseGuardado = await fetch('/api/updateTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ testId: testId, average: average }),
  });

  if (responseGuardado.ok) {
    console.log("Datos Guardados " + testId)
  } else {
    console.error('Error al actualizar el test ' + testId + ' y ' + average);
  }
 try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnosisId, number } ),
      });

      if (!response.ok) {
        throw new Error('Failed to create test');
      }

      // Obtener el nuevo test del cuerpo de la respuesta
      const { id } = await response.json();

      // Redirigir a la página específica con el ID del nuevo test
      router.push(`/InicioSeccion/usuario/diagnostico/d${number}?diagnosisId=${diagnosisId}&userId=${userId}&testId=${id}`);
  } catch (error) {
      console.error('Error creating test:', error);
    }
  };
  return (
    <>
    <Navbar userId={userId}/>
    <main>
      <CuestionarioVentasMark 
        onNavigate={handleNavigation}
      />
    </main>
    </>
  )
}
