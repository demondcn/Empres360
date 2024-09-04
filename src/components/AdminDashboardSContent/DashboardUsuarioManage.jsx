"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus,
  UserMinus,
  UserCog,
  Mail,
  Phone,
  Calendar,
  Search,
  BarChart2,
  PieChart,

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

const UserManagementDashboard = () => {
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

  const userActivityData = [
    { name: 'Ene', activos: 300, inactivos: 100 },
    { name: 'Feb', activos: 400, inactivos: 120 },
    { name: 'Mar', activos: 500, inactivos: 90 },
    { name: 'Abr', activos: 470, inactivos: 110 },
    { name: 'May', activos: 550, inactivos: 100 },
    { name: 'Jun', activos: 600, inactivos: 80 },
  ];

  const userRoleData = [
    { name: 'Administradores', value: 20 },
    { name: 'Gerentes', value: 50 },
    { name: 'Empleados', value: 300 },
    { name: 'Clientes', value: 1000 },
  ];

  const COLORS = ['#4E9419', '#2C5234', '#FFF700', '#FF6B6B'];

  const newUsersData = [
    { name: 'Ene', nuevosUsuarios: 50 },
    { name: 'Feb', nuevosUsuarios: 80 },
    { name: 'Mar', nuevosUsuarios: 120 },
    { name: 'Abr', nuevosUsuarios: 90 },
    { name: 'May', nuevosUsuarios: 110 },
    { name: 'Jun', nuevosUsuarios: 150 },
  ];

  const mockUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Administrador', lastActive: '2023-06-15' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Gerente', lastActive: '2023-06-14' },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos@example.com', role: 'Empleado', lastActive: '2023-06-13' },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Cliente', lastActive: '2023-06-12' },
    { id: 5, name: 'Luis Sánchez', email: 'luis@example.com', role: 'Empleado', lastActive: '2023-06-11' },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Usuarios</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">1,370</p>
                    <p className="text-[#4E9419]">+50 nuevos este mes</p>
                  </div>
                  <Users className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Usuarios Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">1,052</p>
                    <p className="text-[#4E9419]">76% del total</p>
                  </div>
                  <UserCog className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Nuevos Registros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">87</p>
                    <p className="text-[#4E9419]">En los últimos 7 días</p>
                  </div>
                  <UserPlus className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Búsqueda de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="text-[#4E9419]" />
                <Input 
                  type="text" 
                  placeholder="Buscar por nombre, email o rol..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="users" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="users">Lista de Usuarios</TabsTrigger>
              <TabsTrigger value="activity">Actividad de Usuarios</TabsTrigger>
              <TabsTrigger value="roles">Roles de Usuarios</TabsTrigger>
            </TabsList>
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
                          <th className="text-left p-2">Última Actividad</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">{user.lastActive}</td>
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
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activos" fill="#4E9419" />
                      <Bar dataKey="inactivos" fill="#2C5234" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Roles de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userRoleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userRoleData.map((entry, index) => (
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
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Nuevos Usuarios por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={newUsersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="nuevosUsuarios" stroke="#4E9419" />
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
                    <UserPlus className="mr-2 h-4 w-4" /> Nuevo Usuario
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <UserMinus className="mr-2 h-4 w-4" /> Desactivar Usuario
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <Mail className="mr-2 h-4 w-4" /> Enviar Notificación
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <BarChart2 className="mr-2 h-4 w-4" /> Generar Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Estadísticas de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Usuarios Móviles</p>
                      <p className="text-[#4E9419]">65% del total</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Retención a 30 días</p>
                      <p className="text-[#4E9419]">78%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PieChart className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Usuarios Premium</p>
                      <p className="text-[#4E9419]">22% del total</p>
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

export default UserManagementDashboard;