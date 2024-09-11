import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

const CompanyRegistrationInterface = ({ onBackClick }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    nit: '',
    address: '',
    city: '',
    sector: '',
    employeeCount: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company registration data:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-md bg-[#21323C] shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/934998f8-8c24-41fd-bf88-93a6fc55d9fc-8exqPk7JrayPcJsRekohG0YpSGQP9W.jpg" 
              alt="Empres 360 Pro Logo" 
              width={400} 
              height={200}
              className="object-contain"
            />
          </div>
          <CardDescription className="text-xl font-semibold text-[#17D492]">
            Registro de Empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">Nombre de la Empresa</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="bg-[#2C3E50] text-white border-[#17D492]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nit" className="text-white">NIT</Label>
              <Input
                id="nit"
                name="nit"
                value={formData.nit}
                onChange={handleInputChange}
                className="bg-[#2C3E50] text-white border-[#17D492]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Dirección</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-[#2C3E50] text-white border-[#17D492]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-white">Ciudad</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="bg-[#2C3E50] text-white border-[#17D492]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector" className="text-white">Sector</Label>
              <Select name="sector" onValueChange={(value) => handleSelectChange(value, 'sector')}>
                <SelectTrigger className="bg-[#2C3E50] text-white border-[#17D492]">
                  <SelectValue placeholder="Seleccione un sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="salud">Salud</SelectItem>
                  <SelectItem value="educacion">Educación</SelectItem>
                  <SelectItem value="comercio">Comercio</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeCount" className="text-white">Número de Empleados</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                value={formData.employeeCount}
                onChange={handleInputChange}
                className="bg-[#2C3E50] text-white border-[#17D492]"
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full h-16 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 15s ease infinite',
              }}
            >
              <Building2 className="mr-2 h-6 w-6" />
              Registrar Empresa
            </Button>
          </form>
          <Button 
            onClick={() => router.back()}
            className="mt-4 w-full h-12 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[#2C3E50]"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Regresar
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

export default CompanyRegistrationInterface;