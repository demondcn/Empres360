"use client";
import React from 'react';
import VentMark from '@/components/ContextProduccionOperaciones';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';

export default function ListDiag() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  return (
    <>
      <Navbar userId={userId}/>
    <main>
      <VentMark userId={userId}/>
    </main>
    </>
  );
}
