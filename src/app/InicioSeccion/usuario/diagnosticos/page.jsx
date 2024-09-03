"use client";
import React from 'react';
import DiagnosticList from '@/components/DiagnosticList';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';

export default function ListDiag() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  return (
    <>
      <Navbar userId={userId}/>
    <main>
      <DiagnosticList userId={userId}/>
    </main>
    </>
  );
}

