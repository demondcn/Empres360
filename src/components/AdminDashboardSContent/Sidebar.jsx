"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Users, 
  FileText, 
  PieChart,
  Bell,
  FileOutput,
  Settings
} from 'lucide-react';
import { useRouter} from 'next/navigation';

const Sidebar = ({ onSelectSection }) => {
  const router = useRouter();
  return (
    <div className="bg-[#4E9419] w-64 shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className="mt-4">
      <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/InicioAd')}>
          <BarChart2 className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/UserAd')}>
          <Users className="mr-2 h-4 w-4" /> Usuarios
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/DiagnAd')}>
          <FileText className="mr-2 h-4 w-4" /> Diagnósticos
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/AnalisisAd')}>
          <PieChart className="mr-2 h-4 w-4" /> Análisis
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/SoportAd')}>
          <Bell className="mr-2 h-4 w-4" /> Notificaciones
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/ExportAd')}>
          <FileOutput className="mr-2 h-4 w-4" /> Informes
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#2C5234] nav-button" onClick={() => router.push('/InicioSeccion/admin/ConfigAd')}>
          <Settings className="mr-2 h-4 w-4" /> Configuración
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;