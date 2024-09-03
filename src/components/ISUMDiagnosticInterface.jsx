
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, BarChart2 } from "lucide-react";

const ISUMDiagnosticInterface = ({onNewDiagnostic, onViewDiagnostics}) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes glowAnimation {
        0%, 100% { text-shadow: 0 0 5px rgba(255, 247, 0, 0.5), 0 0 10px rgba(78, 148, 25, 0.3); }
        50% { text-shadow: 0 0 10px rgba(255, 247, 0, 0.8), 0 0 20px rgba(78, 148, 25, 0.5); }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle 
            className="text-5xl font-extrabold text-[#4E9419] mb-2"
            style={{
              animation: 'glowAnimation 3s ease-in-out infinite',
            }}
          >
            Emprex360
          </CardTitle>
          <CardDescription className="text-xl font-semibold text-[#2C5234]">
            Sistema de Diagnóstico Empresarial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            className="w-full h-16 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={onNewDiagnostic}
            style={{
              background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite',
            }}
          >
            <BarChart2 className="mr-2 h-6 w-6" />
            Nuevo Diagnóstico
          </Button>
          <Button 
            className="w-full h-16 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={onViewDiagnostics} //
            style={{
              background: 'linear-gradient(-45deg, #4E9419, #2C5234, #FFF700)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite',
            }}
          >
            <ClipboardList className="mr-2 h-6 w-6" />
            Ver Diagnósticos
          </Button>
        </CardContent>
      </Card>
      <div className="absolute bottom-4 right-4 flex items-center opacity-70">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escudo-color-waDOd0j69NtIrPi0lb2qQI4ctw11aR.png"
          alt="Universidad de Cundinamarca Logo"
          width={20}
          height={20}
        />
        <p className="text-white text-xs ml-2 max-w-[400px]">
          Sistema de Diagnóstico aprobado por la Universidad de Cundinamarca
        </p>
      </div>
    </div>
  );
};

export default ISUMDiagnosticInterface;