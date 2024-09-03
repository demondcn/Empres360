
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { diagnosisId, number} = await request.json();


    
    var describcion = number === 1 ? "Ventas y Marketing" : number === 2 ? "DESARROLLO DE LA DIRECCIÓN GENERAL" :number === 3 ? "DESARROLLO DE LA Area Finanzas" :number === 4 ? "Talento Humano" :number === 5 ? "Produccion Operaciones" :number === 6 ? "Tecnologias Informacion" :
  number === 7 ? "Investigacion Desarrollo" :"Descripción desconocida";

    // Crear un nuevo test en la base de datos
    const newTest = await prisma.test.create({
      data: {
        diagnosisId: parseInt(diagnosisId, 10),
        number: parseInt(number, 10),
        result: 0,
        description: describcion,
      },
    });

    // Responder con el ID del nuevo test
    return new Response(JSON.stringify({ id: newTest.id }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating test:', error);
    return new Response(
      JSON.stringify({ error: 'Error creating test' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
