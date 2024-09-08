"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import * as XLSX from 'xlsx';
import { PDFDocument, rgb } from 'pdf-lib';


const ReportsDashboard = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [selectedFields, setSelectedFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

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
    usersExport,
    DiagnosticExport,
    TextExport,
    EmpresExport

  } = dashboardData;

  const reportTypes = [
    { id: 'diagnostics', name: 'Diagnósticos', icon: <BarChart2 className="h-5 w-5" /> },
    { id: 'users', name: 'Usuarios', icon: <Users className="h-5 w-5" /> },
    { id: 'companies', name: 'Empresas', icon: <Building className="h-5 w-5" /> },
    { id: 'text', name: 'Pruebas', icon: <PieChart className="h-5 w-5" /> }, // Cambiado a 'pruebas'
  ];






  const getTableHeaders = () => {
    switch (selectedReport) {
      case 'users':
        return ['id', 'name', 'email', 'nombreEmpresa', 'fechaCreacion'];
      case 'diagnostics':
        return ['id', 'userId', 'status', 'fechaCreacion'];
      case 'text':
        return ['id', 'diagnosisId', 'number', 'result', 'description', 'fechaCreacion'];
      case 'companies':
        return ['id', 'nombre', 'estado', 'sector', 'userId', 'fechaCreacion'];
      default:
        return [];
    }
  };

  const getTableData = () => {
    switch (selectedReport) {
      case 'users':
        return usersExport;
      case 'diagnostics':
        return DiagnosticExport;
      case 'text':
        return TextExport;
      case 'companies':
        return EmpresExport;
      default:
        return [];
    }
  };

  const handleExport = async () => {
    const headers = getTableHeaders();
    const data = getTableData();
    const tableData = data.map(item => headers.map(header => item[header]));

    if (selectedFormat === 'excel') {
      const ws = XLSX.utils.aoa_to_sheet([headers, ...tableData]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'report.xlsx');
    } else if (selectedFormat === 'pdf') {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([1000, 600]);
      const { height } = page.getSize();
      const fontSize = 10;
      const margin = 50;
      const columnWidth = 150; // Ancho de cada columna
      const rowHeight = fontSize + 10; // Altura de cada fila
      const drawTable = (headers, rows) => {
        const tableTop = height - margin - rowHeight;
  
        // Dibujar los encabezados
        headers.forEach((header, i) => {
          page.drawText(header, { x: margin + i * columnWidth, y: tableTop, size: fontSize, color: rgb(0, 0, 0) });
        });
  
        // Dibujar las filas
        rows.forEach((row, i) => {
          row.forEach((cell, j) => {
            page.drawText(String(cell), { x: margin + j * columnWidth, y: tableTop - (i + 1) * rowHeight, size: fontSize, color: rgb(0, 0, 0) });
          });
        });
      };
  
      drawTable(headers, tableData);
  
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      a.click();
      URL.revokeObjectURL(url);
    }
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
                {/* <div>
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
                </div> */}
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
                <CardTitle className="text-[#2C5234]">Datos a Exportar</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        {getTableHeaders().map((header, index) => (
                          <th key={index} className="text-left p-2">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getTableData().map((item, index) => (
                        <tr key={index} className="border-b">
                          {getTableHeaders().map((header, idx) => (
                            <td key={idx} className="p-2">{item[header]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-4">
            <Button className="bg-[#4E9419] text-white" onClick={handleExport}>
              {selectedFormat === 'excel' ? (
                <FileSpreadsheet className="mr-2 h-4 w-4" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
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