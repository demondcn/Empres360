"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  ShoppingCart, 
  FileText, 
  Settings, 
  BarChart2, 
  Bell, 
  Search,
  Menu,
  PieChart,
  UserPlus,
  FileSignature,
  AlertTriangle,
  FileOutput,
  HelpCircle,
  Link
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
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      .nav-button {
        position: relative;
        overflow: hidden;
      }
      .nav-button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #FFF700;
        transition: width 0.3s ease;
      }
      .nav-button:hover::after {
        width: 100%;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const barChartData = [
    { name: 'Ene', completados: 4, enCurso: 3, pendientes: 2 },
    { name: 'Feb', completados: 3, enCurso: 4, pendientes: 1 },
    { name: 'Mar', completados: 5, enCurso: 2, pendientes: 3 },
    { name: 'Abr', completados: 6, enCurso: 3, pendientes: 1 },
    { name: 'May', completados: 4, enCurso: 4, pendientes: 2 },
    { name: 'Jun', completados: 7, enCurso: 3, pendientes: 0 },
  ];

  const lineChartData = [
    { name: 'Ene', empresasActivas: 10 },
    { name: 'Feb', empresasActivas: 12 },
    { name: 'Mar', empresasActivas: 15 },
    { name: 'Abr', empresasActivas: 18 },
    { name: 'May', empresasActivas: 20 },
    { name: 'Jun', empresasActivas: 25 },
  ];

  const pieChartData = [
    { name: 'Completados', value: 60 },
    { name: 'En Curso', value: 30 },
    { name: 'Pendientes', value: 10 },
  ];

  const COLORS = ['#4E9419', '#FFF700', '#2C5234'];

  return (
    <div className="flex h-screen bg-[#2C5234]">
      {/* Sidebar */}
      <div className={`bg-[#4E9419] w-64 shadow-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button">
            <BarChart2 className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button">
            <Users className="mr-2 h-4 w-4" /> Usuarios
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button">
            <FileText className="mr-2 h-4 w-4" /> Diagnósticos
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button">
            <PieChart className="mr-2 h-4 w-4" /> Análisis
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button">
            <Bell className="mr-2 h-4 w-4" /> Notificaciones
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2 text-white hover:bg-[#2C5234] nav-button">
            <FileOutput className="mr-2 h-4 w-4" /> Informes
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#2C5234] nav-button">
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-[#4E9419] shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" className="md:hidden text-white" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center">
              <Input type="text" placeholder="Buscar..." className="mr-2 bg-white" />
              <Button variant="ghost" className="text-white">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="mr-2 text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-[#FFF700] rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-white text-3xl font-medium mb-4">Dashboard</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Total de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-semibold text-[#2C5234]">152</p>
                      <p className="text-[#4E9419]">+12% desde el último mes</p>
                    </div>
                    <FileText className="h-12 w-12 text-[#4E9419]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Empresas Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-semibold text-[#2C5234]">87</p>
                      <p className="text-[#4E9419]">+5% desde la última semana</p>
                    </div>
                    <ShoppingCart className="h-12 w-12 text-[#4E9419]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Usuarios Registrados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-semibold text-[#2C5234]">1,234</p>
                      <p className="text-[#4E9419]">+20 nuevos usuarios</p>
                    </div>
                    <Users className="h-12 w-12 text-[#4E9419]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="charts" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <TabsList>
                <TabsTrigger value="charts">Gráficos</TabsTrigger>
                <TabsTrigger value="users">Usuarios</TabsTrigger>
                <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>
              </TabsList>
              <TabsContent value="charts">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Estado de Diagnósticos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completados" fill="#4E9419" />
                          <Bar dataKey="enCurso" fill="#FFF700" />
                          <Bar dataKey="pendientes" fill="#2C5234" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Empresas Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="empresasActivas" stroke="#4E9419" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Distribución de Diagnósticos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RePieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestión de Usuarios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end mb-4">
                      <Button className="bg-[#4E9419] text-white">
                        <UserPlus className="mr-2 h-4 w-4" /> Agregar Usuario
                      </Button>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Nombre</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Rol</th>
                            <th className="text-left p-2">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(10)].map((_, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">Usuario {index + 1}</td>
                              <td className="p-2">usuario{index + 1}@example.com</td>
                              <td className="p-2">{index % 2 === 0 ? 'Admin' : 'Usuario'}</td>
                              <td className="p-2">
                                <Button variant="ghost" className="mr-2">Editar</Button>
                                <Button variant="ghost" className="text-red-500">Eliminar</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="diagnostics">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestión de Diagnósticos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end mb-4">
                      <Button className="bg-[#4E9419] text-white">
                        <FileSignature className="mr-2 h-4 w-4" /> Nuevo Diagnóstico
                      </Button>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Empresa</th>
                            <th className="text-left p-2">Fecha</th>
                            <th className="text-left p-2">Estado</th>
                            <th className="text-left p-2">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(10)].map((_, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">Empresa {index + 1}</td>
                              <td className="p-2">{new Date().toLocaleDateString()}</td>
                              <td className="p-2">{['Completado', 'En Curso', 'Pendiente'][index % 3]}</td>
                              <td className="p-2">
                                <Button variant="ghost" className="mr-2">Ver</Button>
                                <Button variant="ghost" className="mr-2">Editar</Button>
                                <Button variant="ghost" className="text-red-500">Eliminar</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Notificaciones Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-4">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center">
                          <AlertTriangle className="h-6 w-6 text-[#FFF700] mr-2" />
                          <div>
                            <p className="text-[#2C5234]">Alerta de diagnóstico pendiente</p>
                            <p className="text-[#4E9419] text-sm">Hace {index + 1} horas</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-[#4E9419] text-white">
                      <UserPlus className="mr-2 h-4 w-4" /> Nuevo Usuario
                    </Button>
                    <Button className="bg-[#4E9419] text-white">
                      <FileSignature className="mr-2 h-4 w-4" /> Nuevo Diagnóstico
                    </Button>
                    <Button className="bg-[#4E9419] text-white">
                      <FileOutput className="mr-2 h-4 w-4" /> Generar Informe
                    </Button>
                    <Button className="bg-[#4E9419] text-white">
                      <Settings className="mr-2 h-4 w-4" /> Configuración
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Soporte y Ayuda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HelpCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                      <span className="text-[#2C5234]">Centro de Ayuda</span>
                    </div>
                    <Button className="bg-[#4E9419] text-white">
                      Acceder
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Link className="h-6 w-6 text-[#4E9419] mr-2" />
                      <span className="text-[#2C5234]">Documentación</span>
                    </div>
                    <Button className="bg-[#4E9419] text-white">
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;