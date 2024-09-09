import React from 'react';
import { Home, BarChart2, ClipboardList, LogOut, Menu } from "lucide-react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';  // Importa useRoute

const Navbar = ({userId}) => {
  const status = 'Pending';
  const createdAt = new Date();

  const router = useRouter();
  const navStyle = {
    background: 'linear-gradient(-45deg, #4E9419, #2C5234)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
  };

  const linkStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };
  const handleNewDiagnostic = async () => {
    try {
      const response = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, status, createdAt }),
      });

      if (!response.ok) {
        throw new Error('Failed to create diagnostic');
      }

      const { id } = await response.json();

      // Redirect to the diagnostics page after creating the diagnostic
      router.push(`/InicioSeccion/usuario/diagnostico?id=${id}`);
    } catch (error) {
      console.error('Error creating diagnostic:', error);
    }
  };
  const handleViewDiagnostics = () => {
    router.push('/InicioSeccion/usuario/diagnosticos');
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav style={navStyle}>
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        <a href={`/InicioSeccion/usuario`} style={linkStyle}>
          <Home style={{ marginRight: '0.5rem' }} />
          Inicio
        </a>
        <div style={{ display: 'flex' }}>
          <button onClick={handleNewDiagnostic} style={linkStyle}>
            <BarChart2 style={{ marginRight: '0.5rem' }} />
            Nuevo Diagnóstico
          </button>
          <button onClick={handleViewDiagnostics} style={linkStyle}>
            <ClipboardList style={{ marginRight: '0.5rem' }} />
            Ver Diagnósticos
          </button>
          <button onClick={handleSignOut} style={linkStyle}>
            <LogOut style={{ marginRight: '0.5rem' }} />
            Cerrar Sesión
          </button>
        </div>
        <button 
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem',
            '@media (max-width: 768px)': {
              display: 'block',
            },
          }}
        >
          <Menu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;