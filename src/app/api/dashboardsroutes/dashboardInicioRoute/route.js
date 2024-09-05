import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
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
                estado: 'Activo',
            },
        });

        // Porcentaje de últimas empresas activas hace una semana
        const fechaUnaSemana = new Date();
        fechaUnaSemana.setDate(fechaUnaSemana.getDate() - 7);
        const empresasActivasSemana = await prisma.empresa.count({
            where: {
                estado: 'Activo',
                createdAt: {
                    gte: fechaUnaSemana,
                },
            },
        });

        const totalEmpresasSemana = await prisma.empresa.count({
            where: {
                createdAt: {
                    gte: fechaUnaSemana,
                },
            },
        });

        const porcentajeEmpresasActivasSemana = totalEmpresasSemana > 0 ? (empresasActivasSemana / totalEmpresasSemana) * 100 : 0;

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
        const usuariosNuevos = totalUsuariosUltimoMes;
        // Cantidad total de diagnósticos en status "pending" y "completed"
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


        // Crear notificaciones
        const notificaciones = [];
        const diagnosticos = await prisma.diagnosis.findMany({
            orderBy: {
                updatedAt: 'desc',
            },
            take: totalDiagnosticos, // Número de notificaciones a mostrar
        });

        diagnosticos.forEach(diagnostico => {
            const ahora = new Date();
            const tiempoDesdeActualizacion = ahora - new Date(diagnostico.updatedAt);

            // Convertir el tiempo transcurrido a años, meses, días y horas
            const horasTotales = Math.floor(tiempoDesdeActualizacion / (1000 * 60 * 60));
            const años = Math.floor(horasTotales / (24 * 365));
            const meses = Math.floor((horasTotales % (24 * 365)) / (24 * 30));
            const días = Math.floor((horasTotales % (24 * 30)) / 24);
            const horas = horasTotales % 24;

            let hace = '';
            if (años > 0) hace += `${años} año${años > 1 ? 's' : ''} `;
            if (meses > 0) hace += `${meses} mes${meses > 1 ? 'es' : ''} `;
            if (días > 0) hace += `${días} día${días > 1 ? 's' : ''} `;
            if (horas > 0) hace += `${horas} hora${horas > 1 ? 's' : ''} `;

            notificaciones.push({
                id: diagnostico.id,
                mensaje: `Alerta de diagnóstico ${diagnostico.status === 'Pending' ? 'pendiente' : 'completado'}`,
                hace: hace.trim() || 'menos de una hora',
            });
        });

        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3);

        // Consultar los datos
        const barChartData = await prisma.diagnosis.groupBy({
            by: ['createdAt', 'status'],
            _count: {
                status: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        // Crear un mapa para acumular los conteos de cada mes
        const countsMap = barChartData.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = { completados: 0, pendientes: 0 };
            }
            if (item.status === 'Completate') {
                acc[monthYear].completados += item._count.status;
            } else if (item.status === 'Pending') {
                acc[monthYear].pendientes += item._count.status;
            }
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden descendente
        const sortedKeys = Object.keys(countsMap).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth));
        });

        // Formatear los datos para el gráfico
        const formattedBarChartData1 = sortedKeys.map((key) => ({
            name: key,
            completados: countsMap[key].completados,
            pendientes: countsMap[key].pendientes,
        }));


        const formattedBarChartData = formattedBarChartData1.slice().reverse();

        const empresasActivasPorMes = await prisma.empresa.groupBy({
            by: ['createdAt'],
            _count: {
                estado: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
                estado: 'Activo',  // Solo toma empresas en estado "Activo"
            },
        });

        // Crear un mapa para acumular el conteo de empresas activas por mes
        const countsMapEmpres = empresasActivasPorMes.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear] += item._count.estado;  // Acumula el conteo de empresas activas
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden ascendente
        const sortedKeysEmpres = Object.keys(countsMapEmpres).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth));
        });

        // Formatear los datos para el gráfico en el formato requerido
        const formattedLineChartData1 = sortedKeysEmpres.map((key) => ({
            name: key,
            empresasActivas: countsMapEmpres[key],
        }));
        const formattedLineChartData = formattedLineChartData1.slice().reverse();



        // Información de usuarios, incluyendo su empresa vinculada
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

        //diagnosticos por mes:


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
        const totalEmpresas = await prisma.empresa.count();
        const empresas = await prisma.empresa.findMany({
            orderBy: {
                createdAt: 'desc', // Ordenar por la fecha de creación en orden descendente
            },
            take: totalEmpresas, // Limitar el número de empresas a 10
        });

        // Formatear los datos de las empresas
        const empresasFormateadas = empresas.map(empresa => ({
            id: empresa.id,
            nombre: empresa.nombre,
            fecha: empresa.createdAt.toLocaleDateString(), // Formatear la fecha
            estado: empresa.estado,
        }));

        const users = await prisma.user.findMany({
            select: {
              id: true,
              name: true,
              email: true,
              _count: {
                select: {
                  diagnoses: true, // Contar el número de diagnósticos asociados
                },
              },
            },
          });
        
          // Formatear los datos para enviar al frontend
          const usuariosFormateados = users.map(user => ({
            id: user.id,
            nombre: user.name,
            email: user.email,
            nD: user._count.diagnoses, // Número de diagnósticos
          }));


        return new Response(
            JSON.stringify({
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
                barChartData: formattedBarChartData,
                lineChartData: formattedLineChartData,
                notificaciones,
                empresasFormateadas,
                usuariosFormateados,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener los datos del dashboard' }), { status: 500 });
    }
}
