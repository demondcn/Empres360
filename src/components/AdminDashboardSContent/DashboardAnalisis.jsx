"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Download,
  Share2,
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
  Line,
  LineChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const AnalysisDashboard = () => {
  const [selectedSector, setSelectedSector] = useState('all');

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

  const overallPerformanceData = [
    { name: 'Ene', score: 65 },
    { name: 'Feb', score: 59 },
    { name: 'Mar', score: 80 },
    { name: 'Abr', score: 81 },
    { name: 'May', score: 56 },
    { name: 'Jun', score: 55 },
    { name: 'Jul', score: 40 },
  ];

  const sectorComparisonData = [
    { sector: 'Tecnología', score: 75 },
    { sector: 'Manufactura', score: 68 },
    { sector: 'Servicios', score: 82 },
    { sector: 'Comercio', score: 71 },
    { sector: 'Agricultura', score: 63 },
  ];

  const COLORS = ['#4E9419', '#FFF700', '#FF6B6B', '#36A2EB', '#FF9F40'];

  const radarData = [
    { subject: 'Finanzas', A: 120, B: 110, fullMark: 150 },
    { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
    { subject: 'Operaciones', A: 86, B: 130, fullMark: 150 },
    { subject: 'Recursos Humanos', A: 99, B: 100, fullMark: 150 },
    { subject: 'Tecnología', A: 85, B: 90, fullMark: 150 },
    { subject: 'Liderazgo', A: 65, B: 85, fullMark: 150 },
  ];

  const trendAnalysisData = [
    { name: '2018', tecnologia: 4000, manufactura: 2400, servicios: 2400 },
    { name: '2019', tecnologia: 3000, manufactura: 1398, servicios: 2210 },
    { name: '2020', tecnologia: 2000, manufactura: 9800, servicios: 2290 },
    { name: '2021', tecnologia: 2780, manufactura: 3908, servicios: 2000 },
    { name: '2022', tecnologia: 1890, manufactura: 4800, servicios: 2181 },
    { name: '2023', tecnologia: 2390, manufactura: 3800, servicios: 2500 },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Análisis de Diagnósticos Empresariales</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Puntuación Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">72.5</p>
                    <p className="text-[#4E9419]">+2.3 vs mes anterior</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Sector Líder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">Servicios</p>
                    <p className="text-[#4E9419]">Puntuación: 82</p>
                  </div>
                  <Target className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Área de Mejora</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">Liderazgo</p>
                    <p className="text-[#4E9419]">Puntuación: 65</p>
                  </div>
                  <TrendingDown className="h-12 w-12 text-[#FF6B6B]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Filtrar por Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedSector} defaultValue={selectedSector}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los sectores</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="manufactura">Manufactura</SelectItem>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="comercio">Comercio</SelectItem>
                  <SelectItem value="agricultura">Agricultura</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Tabs defaultValue="overall" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="overall">Rendimiento General</TabsTrigger>
              <TabsTrigger value="comparison">Comparación Sectorial</TabsTrigger>
              <TabsTrigger value="areas">Áreas de Negocio</TabsTrigger>
            </TabsList>
            <TabsContent value="overall">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Rendimiento General</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={overallPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#4E9419" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comparison">
              <Card>
                <CardHeader>
                  <CardTitle>Comparación por Sectores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sector" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#4E9419" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="areas">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis por Áreas de Negocio</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Empresa" dataKey="A" stroke="#4E9419" fill="#4E9419" fillOpacity={0.6} />
                      <Radar name="Promedio del Sector" dataKey="B" stroke="#FFF700" fill="#FFF700" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Análisis de Tendencias</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tecnologia" stroke="#4E9419" />
                    <Line type="monotone" dataKey="manufactura" stroke="#FFF700" />
                    <Line type="monotone" dataKey="servicios" stroke="#FF6B6B" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones de Análisis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#4E9419] text-white">
                    <Zap className="mr-2 h-4 w-4" /> Análisis Predictivo
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <Activity className="mr-2 h-4 w-4" /> Benchmarking
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <Download className="mr-2 h-4 w-4" /> Exportar Informe
                  </Button>
                  <Button className="bg-[#4E9419] text-white">
                    <Share2 className="mr-2 h-4 w-4" /> Compartir Resultados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Insights Clave</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-[#4E9419] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Crecimiento en el sector de servicios</p>
                        <p className="text-sm text-gray-600">El sector de servicios muestra un crecimiento constante en los últimos 3 meses, superando la media del mercado en un 15%.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingDown className="h-6 w-6 text-[#FF6B6B] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-sem
ibold">Desafíos en el liderazgo</p>
                        <p className="text-sm text-gray-600">Se identifica una oportunidad de mejora en las habilidades de liderazgo en todos los sectores, con una puntuación promedio de 65.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Target className="h-6 w-6 text-[#4E9419] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Potencial en tecnología</p>
                        <p className="text-sm text-gray-600">El sector tecnológico muestra un alto potencial de crecimiento, con un aumento del 20% en la adopción de nuevas tecnologías.</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisDashboard;