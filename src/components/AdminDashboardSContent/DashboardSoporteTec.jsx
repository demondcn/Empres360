"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Search,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  RefreshCw,
  Download,
} from 'lucide-react';

const TechnicalSupportNotifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

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

  const mockNotifications = [
    { id: 1, user: "Juan Pérez", message: "Problemas con la conexión a la base de datos", status: "pending", timestamp: "2023-06-15 10:30" },
    { id: 2, user: "María García", message: "Error al generar informe mensual", status: "in_progress", timestamp: "2023-06-14 15:45" },
    { id: 3, user: "Carlos Rodríguez", message: "Solicitud de actualización de software", status: "resolved", timestamp: "2023-06-13 09:20" },
    { id: 4, user: "Ana Martínez", message: "Problema de rendimiento en el módulo de análisis", status: "pending", timestamp: "2023-06-12 14:10" },
    { id: 5, user: "Luis Sánchez", message: "Consulta sobre nuevas funcionalidades", status: "resolved", timestamp: "2023-06-11 11:55" },
  ];

  const filteredNotifications = mockNotifications.filter(notification => 
    (notification.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === 'all' || notification.status === filter)
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">En Progreso</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Resuelto</Badge>;
      default:
        return <Badge variant="outline" className="bg-red-100 text-red-800">Error</Badge>;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Notificaciones de Servicio Técnico</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{mockNotifications.length}</p>
                    <p className="text-[#4E9419]">Últimos 30 días</p>
                  </div>
                  <Bell className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">
                      {mockNotifications.filter(n => n.status === 'pending').length}
                    </p>
                    <p className="text-[#4E9419]">Requieren atención</p>
                  </div>
                  <Clock className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Resueltos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">
                      {mockNotifications.filter(n => n.status === 'resolved').length}
                    </p>
                    <p className="text-[#4E9419]">En el último mes</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Buscar y Filtrar Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <div className="flex items-center flex-grow">
                  <Search className="text-[#4E9419] mr-2" />
                  <Input 
                    type="text" 
                    placeholder="Buscar por usuario o mensaje..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                  />
                </div>
                <div className="flex items-center">
                  <Filter className="text-[#4E9419] mr-2" />
                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="all">Todos</option>
                    <option value="pending">Pendientes</option>
                    <option value="in_progress">En Progreso</option>
                    <option value="resolved">Resueltos</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Lista de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <Card key={notification.id} className="bg-white">
                      <CardContent className="flex items-start p-4">
                        {getStatusIcon(notification.status)}
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-[#2C5234]">{notification.user}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                            </div>
                            {getStatusBadge(notification.status)}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end space-x-4">
            <Button className="bg-[#4E9419] text-white">
              <RefreshCw className="mr-2 h-4 w-4" /> Actualizar
            </Button>
            <Button className="bg-[#4E9419] text-white">
              <Download className="mr-2 h-4 w-4" /> Exportar Notificaciones
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechnicalSupportNotifications;