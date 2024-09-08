"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioDesarrolloDireccionGeneral = ({ onNavigate }) => {
  const [responses, setResponses] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [allAnswered, setAllAnswered] = useState(false);
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  useEffect(() => {
    const shuffleArray = (array) => {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    const questions = [
      {
        number: 1,
        text: "¿Cuál es la visión y misión de la empresa? ¿Son conocidas y compartidas por todos los miembros del equipo directivo?",
        options: [
          { value: "5", label: "Sí, la visión y misión de la empresa son conocidas y compartidas por todos los miembros del equipo directivo" },
          { value: "3", label: "Algunos miembros del equipo directivo conocen y comparten la visión y misión de la empresa, pero no todos" },
          { value: "1", label: "No, la visión y misión de la empresa no son conocidas ni compartidas por los miembros del equipo directivo" },
        ]
      },
      {
        number: 2,
        text: "¿Existe un plan estratégico establecido? ¿Ha sido comunicado y se está implementando de manera efectiva?",
        options: [
          { value: "5", label: "Sí, existe un plan estratégico claro y detallado que ha sido comunicado y se está implementando de manera efectiva" },
          { value: "3", label: "Sí, existe un plan estratégico, pero no ha sido completamente comunicado o implementado de manera efectiva" },
          { value: "1", label: "No, no hay un plan estratégico establecido ni se ha comunicado o implementado efectivamente" },
        ]
      },
      {
        number: 3,
        text: "¿Existe un plan estratégico consensuado con los directivos de la empresa que se proyecta en un horizonte de tiempo de 3 a 5 años y está actualizado?",
        options: [
          { value: "5", label: "Sí, contamos con un plan estratégico consensuado con los directivos que se proyecta en un horizonte de tiempo de 3 a 5 años y está actualizado en el momento" },
          { value: "3", label: "Sí, tenemos un plan estratégico con los directivos, pero no se proyecta en un horizonte de tiempo específico de 3 a 5 años o no está completamente actualizado en el momento" },
          { value: "1", label: "No, no tenemos un plan estratégico consensuado con los directivos de la empresa o no se ha actualizado en mucho tiempo" },
        ]
      },
      {
        number: 4,
        text: "¿Cómo se toman las decisiones estratégicas en la organización? ¿Se sigue un proceso estructurado y participativo?",
        options: [
          { value: "5", label: "Se sigue un proceso estructurado y participativo" },
          { value: "3", label: "A veces se sigue un proceso estructurado y participativo" },
          { value: "1", label: "No se sigue un proceso estructurado y participativo" },
        ]
      },
      {
        number: 5,
        text: "¿Se fomenta y promueve la innovación en la organización? ¿Se implementan nuevas ideas y propuestas?",
        options: [
          { value: "5", label: "Sí, hay un fuerte énfasis en la innovación y se promueve activamente la generación y el desarrollo de nuevas ideas y propuestas" },
          { value: "3", label: "Algunas veces se fomenta la innovación y se implementan nuevas ideas y propuestas, pero no de manera consistente o sistemática" },
          { value: "1", label: "No se fomenta ni promueve la innovación en la organización y rara vez se implementan nuevas ideas o propuestas" },
        ]
      },
      {
        number: 6,
        text: "¿Existen indicadores clave de desempeño (KPIs) establecidos para medir el éxito de la estrategia y los procesos directivos?",
        options: [
          { value: "5", label: "Sí, se han establecido KPIs claros y medibles que evalúan el éxito de la estrategia y los procesos directivos" },
          { value: "3", label: "Sí, hay algunos KPIs establecidos, pero podrían ser más específicos y medibles" },
          { value: "1", label: "No, no existen KPIs establecidos para evaluar el éxito de la estrategia y los procesos directivos" },
        ]
      },
      {
        number: 7,
        text: "¿Cómo se lleva a cabo la comunicación y colaboración entre los miembros del equipo directivo?",
        options: [
          { value: "5", label: "La comunicación y colaboración entre los miembros del equipo directivo se realiza de manera fluida y constante, utilizando herramientas tecnológicas modernas y fomentando reuniones periódicas para intercambiar información y tomar decisiones conjuntas" },
          { value: "3", label: "La comunicación y colaboración entre los miembros del equipo directivo se lleva a cabo de forma regular, pero puede haber algunos retrasos en la transmisión de información y falta de coordinación en ciertas ocasiones" },
          { value: "1", label: "La comunicación y colaboración entre los miembros del equipo directivo es limitada, hay poca interacción y falta de coordinación, lo que puede llevar a retrasos en la toma de decisiones y dificultades para trabajar en equipo" },
        ]
      },
      {
        number: 8,
        text: "¿Se realizan reuniones periódicas con el equipo directivo para abordar temas estratégicos y evaluar el progreso?",
        options: [
          { value: "5", label: "Sí, se realizan reuniones periódicas con el equipo directivo para abordar temas estratégicos y evaluar el progreso" },
          { value: "3", label: "A veces, se realizan reuniones periódicas con el equipo directivo para abordar temas estratégicos y evaluar el progreso" },
          { value: "1", label: "No, no se realizan reuniones periódicas con el equipo directivo para abordar temas estratégicos y evaluar el progreso" },
        ]
      },
      {
        number: 9,
        text: "¿Se fomenta el desarrollo y crecimiento de las habilidades directivas dentro del equipo?",
        options: [
          { value: "5", label: "Sí, se fomenta activamente el desarrollo y crecimiento de las habilidades directivas del equipo" },
          { value: "3", label: "En cierta medida, se ofrece apoyo y oportunidades para el desarrollo de habilidades directivas" },
          { value: "1", label: "No, el desarrollo y crecimiento de las habilidades directivas no son una prioridad dentro del equipo" },
        ]
      },
      {
        number: 10,
        text: "¿Se han establecido mecanismos de seguimiento y evaluación del desempeño del área de Dirección General?",
        options: [
          { value: "5", label: "Sí, se han establecido mecanismos de seguimiento y evaluación del desempeño del área de Dirección General y son altamente efectivos" },
          { value: "3", label: "Sí, se han establecido mecanismos de seguimiento y evaluación del desempeño del área de Dirección General, pero podrían mejorarse" },
          { value: "1", label: "No, no se han establecido mecanismos de seguimiento y evaluación del desempeño del área de Dirección General" },
        ]
      },
      {
        number: 11,
        text: "¿Cómo se ha implementado la mejora continua en los procesos directivos de la organización?",
        options: [
          { value: "5", label: "Se han establecido sistemas de gestión de calidad basados en estándares reconocidos internacionalmente, como ISO 9001, y se realizan auditorías periódicas para asegurar el cumplimiento y la mejora continua de los procesos directivos" },
          { value: "3", label: "Se han realizado algunas iniciativas de mejora continua en los procesos directivos, pero no se cuenta con un sistema formal de gestión de calidad ni se realizan auditorías periódicas" },
          { value: "1", label: "No se ha implementado ninguna mejora continua en los procesos directivos de la organización" },
        ]
      }
    ];
    
    // Mezclar las opciones de cada pregunta al montar el componente
    const initializeQuestions = () => {
      const newQuestions = questions.map(question => ({
        ...question,
        options: shuffleArray(question.options),
      }));
      setShuffledQuestions(newQuestions);
    };

    initializeQuestions();
  }, []);
  useEffect(() => {
    // Verificar si todas las preguntas tienen una respuesta
    const allQuestionsAnswered = shuffledQuestions.every(question => responses[question.number]);
    setAllAnswered(allQuestionsAnswered);
  }, [responses, shuffledQuestions]);

  const handleResponseChange = (questionNumber, value) => {
    setResponses(prev => ({ ...prev, [questionNumber]: value }));
  };

  const calculatePercentage = () => {
    const values = Object.values(responses).map(Number);
    const total = values.reduce((acc, val) => acc + val, 0);
    
    const maxScore = 55; // Puntuación máxima posible: 10 preguntas con valor máximo de 3 cada una
    const percentage = (total / maxScore) * 100;
    
    return percentage;
  };

  const handleSubmit = () => {
    const percentage = calculatePercentage();
    onNavigate(percentage); 
  };


  

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5234] mb-2 break-words hyphens-auto flex items-center justify-center">
            <BarChart2 className="mr-2 h-8 w-8" />
            DESARROLLO DE LA DIRECCIÓN GENERAL
            </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {shuffledQuestions.map((question) => (
                <motion.div
                  key={question.number}
                  className="space-y-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: question.number * 0.1 }}
                >
                  <h3 className="font-semibold text-[#2C5234]">{question.number}. {question.text}</h3>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <motion.div
                        key={option.value}
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >


                        <motion.div
                          className={`w-6 h-6 rounded-full border-2 border-[#4E9419] flex items-center justify-center cursor-pointer ${
                            responses[question.number] === option.value ? 'bg-[#4E9419]' : 'bg-white'
                          }`}
                          onClick={() => handleResponseChange(question.number, option.value)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >

                          {responses[question.number] === option.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                        <Label 
                          htmlFor={`q${question.number}-${option.value}`} 
                          className="cursor-pointer"
                          onClick={() => handleResponseChange(question.number, option.value)}
                        >
                          {option.label}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              className="w-full mt-4 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={handleSubmit}
              disabled={!allAnswered} // Deshabilitar el botón si no están todas las respuestas
              style={{
                background: allAnswered 
                  ? 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)' 
                  : 'gray',
                backgroundSize: '400% 400%',
                animation: allAnswered ? 'gradientAnimation 15s ease infinite' : 'none',
              }}
            >
              Siguiente
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CuestionarioDesarrolloDireccionGeneral;