"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  ClipboardList, 
  BarChart2,
  PieChart,
  
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Download,
  Trash2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Pie,
  Cell
} from 'recharts';

const DiagnosticManagementDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const diagnosticStatusData = [
    { name: 'Completados', value: 300 },
    { name: 'En Progreso', value: 150 },
    { name: 'Pendientes', value: 100 },
  ];

  const COLORS = ['#4E9419', '#FFF700', '#FF6B6B'];

  const monthlyDiagnosticsData = [
    { name: 'Ene', diagnosticos: 50 },
    { name: 'Feb', diagnosticos: 80 },
    { name: 'Mar', diagnosticos: 120 },
    { name: 'Abr', diagnosticos: 90 },
    { name: 'May', diagnosticos: 110 },
    { name: 'Jun', diagnosticos: 150 },
  ];

  const sectorDistributionData = [
    { name: 'Tecnología', value: 30 },
    { name: 'Manufactura', value: 25 },
    { name: 'Servicios', value: 20 },
    { name: 'Comercio', value: 15 },
    { name: 'Otros', value: 10 },
  ];

  const mockDiagnostics = [
    { id: 1, company: 'TechSolutions SA', sector: 'Tecnología', status: 'Completado', date: '2023-06-15' },
    { id: 2, company: 'IndustriasPro', sector: 'Manufactura', status: 'En Progreso', date: '2023-06-14' },
    { id: 3, company: 'ServiExpress', sector: 'Servicios', status: 'Pendiente', date: '2023-06-13' },
    { id: 4, company: 'ComercioTotal', sector: 'Comercio', status: 'Completado', date: '2023-06-12' },
    { id: 5, company: 'AgroInnovación', sector: 'Agricultura', status: 'En Progreso', date: '2023-06-11' },
  ];

  const filteredDiagnostics = mockDiagnostics.filter(diagnostic => 
    diagnostic.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    diagnostic.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    diagnostic.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Diagnósticos Empresariales</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">550</p>
                    <p className="text-[#4E9419]">+30 este mes</p>
                  </div>
                  <ClipboardList className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Diagnósticos Completados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">300</p>
                    <p className="text-[#4E9419]">54% del total</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Diagnósticos en Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">150</p>
                    <p className="text-[#4E9419]">27% del total</p>
                  </div>
                  <Clock className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Búsqueda de Diagnósticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="text-[#4E9419]" />
                <Input 
                  type="text" 
                  placeholder="Buscar por empresa, sector o estado..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="list" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="list">Lista de Diagnósticos</TabsTrigger>
              <TabsTrigger value="status">Estado de Diagnósticos</TabsTrigger>
              <TabsTrigger value="sectors">Distribución por Sectores</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-[#4E9419] text-white">
                      <Plus className="mr-2 h-4 w-4" /> Nuevo Diagnóstico
                    </Button>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Empresa</th>
                          <th className="text-left p-2">Sector</th>
                          <th className="text-left p-2">Estado</th>
                          <th className="text-left p-2">Fecha</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDiagnostics.map((diagnostic) => (
                          <tr key={diagnostic.id} className="border-b">
                            <td className="p-2">{diagnostic.company}</td>
                            <td className="p-2">{diagnostic.sector}</td>
                            <td className="p-2">{diagnostic.status}</td>
                            <td className="p-2">{diagnostic.date}</td>
                            <td className="p-2">
                              <Button variant="ghost" className="mr-2">
                                <FileText className="h-4 w-4 mr-1" /> Ver
                              </Button>
                              <Button variant="ghost" className="text-red-500">
                                <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="status">
              <Card>
                <CardHeader>
                  <CardTitle>Estado de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={diagnosticStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {diagnosticStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sectors">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Sectores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#4E9419" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Diagnósticos por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyDiagnosticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="diagnosticos" stroke="#4E9419" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#4E9419] text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Diagnóstico
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <Download className="mr-2 h-4 w-4" /> Exportar Informes
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <AlertTriangle className="mr-2 h-4 w-4" /> Diagnósticos Pendientes
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <BarChart2 className="mr-2 h-4 w-4" /> Análisis Comparativo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Estadísticas de Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Tiempo Promedio</p>
                      <p className="text-[#4E9419]">3.5 días por diagnóstico</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Tasa de Finalización</p>
                      <p className="text-[#4E9419]">85% completados</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PieChart className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Sector Predominante</p>
                      <p className="text-[#4E9419]">Tecnología (30%)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiagnosticManagementDashboard;