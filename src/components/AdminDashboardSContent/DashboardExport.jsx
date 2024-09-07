"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  FileSpreadsheet,
  FileText,
  Download,
  Calendar,
  BarChart2,
  PieChart,
  Users,
  Building,
  Filter,
} from 'lucide-react';

const ReportsDashboard = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animated-gradient {
        animation: gradientAnimation 15s ease infinite;
        background: linear-gradient(-45deg, #FFF700, #4E9419, #2C5234);
        background-size: 400% 400%;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const reportTypes = [
    { id: 'diagnostics', name: 'Diagnósticos', icon: <BarChart2 className="h-5 w-5" /> },
    { id: 'users', name: 'Usuarios', icon: <Users className="h-5 w-5" /> },
    { id: 'companies', name: 'Empresas', icon: <Building className="h-5 w-5" /> },
    { id: 'sectors', name: 'Pruebas', icon: <PieChart className="h-5 w-5" /> },
  ];

  const fieldOptions = {
    diagnostics: ['ID', 'Empresa', 'Sector', 'Fecha', 'Puntuación', 'Estado'],
    users: ['ID', 'Nombre', 'Email', 'Rol', 'Fecha de Registro', 'Último Acceso'],
    companies: ['ID', 'Nombre', 'Sector', 'Tamaño', 'Fecha de Registro', 'Último Diagnóstico'],
    sectors: ['Sector', 'Número de Empresas', 'Puntuación Promedio', 'Tendencia'],
  };

  const handleFieldToggle = (field) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleExport = () => {
    // Esta es una función simulada. En una implementación real, aquí se conectaría con el backend para generar el informe.
    console.log('Exportando informe:', {
      tipo: selectedReport,
      formato: selectedFormat,
      fechaInicio: dateRange.start,
      fechaFin: dateRange.end,
      campos: selectedFields,
    });
    alert(`Informe de ${selectedReport} exportado en formato ${selectedFormat}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Generación de Informes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {reportTypes.map((report) => (
              <Card key={report.id} className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234] flex items-center">
                    {report.icon}
                    <span className="ml-2">{report.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-[#4E9419] text-white"
                    onClick={() => setSelectedReport(report.id)}
                  >
                    Seleccionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Configuración del Informe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2C5234] mb-1">Tipo de Informe</label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de informe" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>{report.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C5234] mb-1">Rango de Fechas</label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="flex-1"
                    />
                    <Input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C5234] mb-1">Formato de Exportación</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedReport && (
            <Card className="bg-white/90 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Campos a Incluir</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {fieldOptions[selectedReport].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox
                          id={field}
                          checked={selectedFields.includes(field)}
                          onCheckedChange={() => handleFieldToggle(field)}
                        />
                        <label
                          htmlFor={field}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {field}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-4">
            <Button className="bg-[#4E9419] text-white" onClick={handleExport}>
              {selectedFormat === 'excel' ? (
                <FileSpreadsheet className="mr-2 h-4 w-4" />
              ) : (
                <FileText  className="mr-2 h-4 w-4" />
              )}
              Exportar Informe
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsDashboard;