import prisma from '@/lib/prisma';

// pages/api/dashboard-data.js
import prisma from '@/lib/prisma'; // Asegúrate de tener la instancia de prisma en lib/prisma.js

export default async function handler(req, res) {
  try {
    // Total de diagnósticos
    const totalDiagnosticos = await prisma.diagnosis.count();

    // Total de diagnósticos creados el último mes
    const fechaUltimoMes = new Date();
    fechaUltimoMes.setMonth(fechaUltimoMes.getMonth() - 1);
    const totalDiagnosticosUltimoMes = await prisma.diagnosis.count({
      where: {
        createdAt: {
          gte: fechaUltimoMes,
        },
      },
    });

    // Cantidad de empresas activas
    const totalEmpresasActivas = await prisma.empresa.count({
      where: {
        estado: 'online',
      },
    });

    // Porcentaje de últimas empresas activas hace una semana
    const fechaUnaSemana = new Date();
    fechaUnaSemana.setDate(fechaUnaSemana.getDate() - 7);
    const empresasActivasSemana = await prisma.empresa.count({
      where: {
        estado: 'online',
        createdAt: {
          gte: fechaUnaSemana,
        },
      },
    });
    //
    const totalEmpresasSemana = await prisma.empresa.count({
      where: {
        createdAt: {
          gte: fechaUnaSemana,
        },
      },
    });
    //
    const porcentajeEmpresasActivasSemana = totalEmpresasSemana > 0 ? (empresasActivasSemana / totalEmpresasSemana) * 100 : 0;
    //
    // Total de usuarios registrados
    const totalUsuarios = await prisma.user.count();

    // Porcentaje de registros de usuarios del último mes
    const totalUsuariosUltimoMes = await prisma.user.count({
      where: {
        createdAt: {
          gte: fechaUltimoMes,
        },
      },
    });
    const porcentajeUsuariosUltimoMes = totalUsuarios > 0 ? (totalUsuariosUltimoMes / totalUsuarios) * 100 : 0;

    // Cantidad total de diagnósticos en status "pending" y "completate"
    const diagnosticosPendientes = await prisma.diagnosis.count({
      where: {
        status: 'pending',
      },
    });
    const diagnosticosCompletados = await prisma.diagnosis.count({
      where: {
        status: 'completate',
      },
    });

    // Información de usuarios, incluyendo su empresa vinculada(revisar)
    const usuariosConEmpresa = await prisma.user.findMany({
      include: {
        empresas: {
          select: {
            nombre: true,
          },
        },
      },
    });

    // Información de empresa, nombre, fecha de registro, estado del último diagnóstico
    const empresasConDiagnostico = await prisma.empresa.findMany({
      include: {
        user: {
          include: {
            diagnoses: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
              select: {
                status: true,
              },
            },
          },
        },
      },
    });

    // Información sobre el tiempo de diagnóstico en status "pending"
    const diagnosticosPendientesConTiempo = await prisma.diagnosis.findMany({
      where: {
        status: 'pending',
      },
      select: {
        createdAt: true,
      },
    });

    const currentDate = new Date();
    const tiemposPendientes = diagnosticosPendientesConTiempo.map(diagnostico => {
      const tiempo = Math.floor((currentDate - new Date(diagnostico.createdAt)) / (1000 * 60 * 60 * 24)); // Diferencia en días
      return tiempo;
    });

    res.status(200).json({
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del dashboard' });
  }
}
