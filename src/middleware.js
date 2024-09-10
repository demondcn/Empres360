import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// Define el correo del administrador
const adminEmail = "oagudelod@ucundinamarca.edu.co";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req }); // Obtener el token de autenticación

    // Verificar si la ruta es de administración
    if (req.nextUrl.pathname.startsWith("/InicioSeccion/admin")) {
      // Si no está autenticado o el correo no coincide con el del administrador, redirigir
      if (!token || token.email !== adminEmail) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Continuar con la ejecución si la ruta no es de administración o si es el administrador
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Asegúrate de que cualquier usuario autenticado pueda acceder a las rutas protegidas
    },
  }
);

export const config = {
  matcher: ["/InicioSeccion/usuario/:path*", "/InicioSeccion/admin/:path*"], // Proteger las rutas de usuario y administración
};
