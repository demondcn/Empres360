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
  FileText,
  Users,
  Building,
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
  LabelList,
  PieChart as RePieChart, PieChart
} from 'recharts';
import { useRouter } from 'next/navigation';

const AnalysisDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedSector, setSelectedSector] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboardsroutes/dashboardInicioRoute');
        const data = await res.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    }
    fetchData();
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


  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!dashboardData) {
    return <p>Error al cargar los datos</p>;
  }
  const {
    totalDiagnosticos,
    totalDiagnosticosUltimoMes,
    totalEmpresasActivas,
    porcentajeEmpresasActivasSemana,
    totalUsuarios,
    porcentajeUsuariosUltimoMes,
    diagnosticosPendientes,
    diagnosticosCompletados,
    usuariosConEmpresa,
    empresasConDiagnostico,
    tiemposPendientes,
    usuariosNuevos,
    barChartData,
    lineChartData,
    notificaciones,
    empresasFormateadas,
    usuariosFormateados,
    totalEmpresas,
    newUsersData,
    userActivityBar,
    testResulPie,
    formattedResultsTestCounts,
    monthlyDiagnosticsData,
    radarData,
    menorResultadoDescripcion
  } = dashboardData;

  const porcentajeD = (diagnosticosCompletados/totalDiagnosticos) * 100
  const userActivityData = userActivityBar;
  const sectorDistributionData = formattedResultsTestCounts;

  const userRoleData = testResulPie;

  const pieChartData = [
    { name: 'Completados', value: diagnosticosCompletados },
    { name: 'Pendientes', value: diagnosticosPendientes },
  ];

  const COLORSPruebasUsuarios = ['#4E9419', '#2C5234', '#FE1100', '#FF6B6B', '#3498DB', '#9B59B6', '#E67E22'];
  const COLORS = ['#4E9419', '#2C5234'];



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

  const COLORSPie = ['#4E9419', '#2C5234'];

  // const radarData = [
  //   { subject: 'Finanzas', A: 120, B: 110, fullMark: 150 },
  //   { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
  //   { subject: 'Operaciones', A: 86, B: 130, fullMark: 150 },
  //   { subject: 'Recursos Humanos', A: 99, B: 100, fullMark: 150 },
  //   { subject: 'Tecnología', A: 85, B: 90, fullMark: 150 },
  //   { subject: 'Liderazgo', A: 65, B: 85, fullMark: 150 },
  //   { subject: 'xdfunciona', A: 65, B: 85, fullMark: 150 }
  // ];



  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Análisis de Diagnósticos Empresariales</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalDiagnosticos}</p>
                    <p className="text-[#4E9419]">{diagnosticosCompletados} completados, {diagnosticosPendientes} pendientes</p>
                  </div>
                  <FileText className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Usuarios Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalUsuarios}</p>
                    <p className="text-[#4E9419]">Usuarios registrados</p>
                  </div>
                  <Users className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Empresas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalEmpresas}</p>
                    <p className="text-[#4E9419]">Empresas registradas</p>
                  </div>
                  <Building className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Filtrar</CardTitle>
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

          {/* <Card className="bg-white/90 backdrop-blur-sm mb-6">
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
          </Card> */}


          <Tabs defaultValue="overall" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>

              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>
              <TabsTrigger value="prueb">Pruebas</TabsTrigger>
              <TabsTrigger value="empres">Empresas</TabsTrigger>
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

                <Card>
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
                            <Cell key={`cell-${index}`} fill={COLORSPie[index % COLORSPie.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados Maximos De Usuarios Por Prueba</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
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
                            <Cell key={`cell-${index}`} fill={COLORSPruebasUsuarios[index % COLORSPruebasUsuarios.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-[#2C5234]">Distribución por Cantidad de Pruebas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={sectorDistributionData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#4E9419">
                          <LabelList dataKey="value" position="right" fill="#2C5234" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
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
              </div>
            </TabsContent>
          </Tabs>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Análisis por Áreas de Prueba</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Pruebas" dataKey="A" stroke="#4E9419" fill="#4E9419" fillOpacity={0.6} />

                    <Legend />
                  </RadarChart>
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
                <CardTitle className="text-[#2C5234]">Puntos Clave</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-[#4E9419] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Tasa de finalización</p>
                        <p className="text-sm text-gray-600">El {porcentajeD}% de los diagnósticos iniciados se completan exitosamente.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingDown className="h-6 w-6 text-[#FF6B6B] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Área de mejora: {menorResultadoDescripcion}</p>
                        <p className="text-sm text-gray-600">Es necesario mejorar en los siguientes aspectos de la prueba {menorResultadoDescripcion} del diagnóstico empresarial. Identificar estas áreas permitirá optimizar los resultados y fortalecer el rendimiento general de las empresas.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Target className="h-6 w-6 text-[#4E9419] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Crecimiento de diagnóstico</p>
                        <p className="text-sm text-gray-600">El número de diagnósticos creados ha aumentado en un 20%.</p>
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