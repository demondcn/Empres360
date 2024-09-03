"use client";
import React from "react";
import { useForm } from 'react-hook-form'
import * as Components from '../components/Components';
import "../components/LoginRegis.css"
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react';

export default function Inicio() {
    const { register: registerRegister, handleSubmit: handleSubmitRegister, reset: reset } = useForm();
    const { register: registerLogin, handleSubmit: handleSubmitLogin} = useForm();
    

    const onSubmitRegister = handleSubmitRegister(async (data) => {
        const res = await fetch('/api/auth/registro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        reset()
    })

    const onSubmitLogin = handleSubmitLogin(async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if (res.error) {
            alert(res.error);
        } else {
            // Espera a que se cargue la sesión para obtener el id del usuario
            const session = await getSession();
            if (session && session.user) {
                const userId = session.user.id;
                // Redirige a la página con el userId en la URL
                window.location.replace(`/InicioSeccion/usuario?userId=${userId}`);
            } else {
                alert("No se pudo obtener el id del usuario.");
            }
        }
    });



    const [signInMode, toggleMode] = React.useState(true);
    return (

        <Components.Container>
            <Components.SignUpContainer signinIn={signInMode}>
                <Components.Form onSubmit={onSubmitRegister}>
                    <Components.Title>Crear Cuenta</Components.Title>
                    <Components.Input
                        type='text'
                        placeholder='Nombre'
                        {...registerRegister("name", {
                            required: true,
                        })}
                    />
                    <Components.Input
                        type='email'
                        placeholder='Correo'
                        {...registerRegister("email", {
                            required: true,
                        })}

                    />
                    <Components.Input
                        type='password'
                        placeholder='Contraseña'
                        {...registerRegister("password", {
                            required: true,
                        })}

                    />
                    <Components.Button >Registrarse</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signInMode}>
                <Components.Form onSubmit={onSubmitLogin}>
                    <Components.Title>Iniciar Sesión</Components.Title>
                    <Components.Input
                        type='email'
                        placeholder='Correo'
                        {...registerLogin("email", {
                            required: true,
                        })}
                        
                    />
                    <Components.Input
                        type='password'
                        placeholder='Contraseña'
                        {...registerLogin("password", {
                            required: true,
                        })}
                        
                    />
                    <Components.Anchor href='#'>¿Perdiste tu contraseña?</Components.Anchor>
                    <Components.Button >Iniciar sesión</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signInMode}>
                <Components.Overlay signinIn={signInMode}>

                    <Components.LeftOverlayPanel signinIn={signInMode}>
                        <Components.Title>¡Bienvenido!</Components.Title>
                        <Components.Paragraph>
                            Impulse el rendimiento de su empresa. Regístrate hoy y aprovecha esta oportunidad para llevar tu empresa al siguiente nivel.
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggleMode(true)}>
                            Iniciar sesión
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signInMode}>
                        <Components.Title>Emprex360</Components.Title>
                        <Components.Paragraph>
                            Introduce tus datos personales y comienza a llevar tu empresa al siguiente nivel.
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggleMode(false)}>
                            Registrarse
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

