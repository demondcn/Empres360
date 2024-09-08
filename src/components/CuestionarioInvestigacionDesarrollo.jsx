"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioInvestigacionDesarrollo = ({ onNavigate }) => {
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
        text: "¿Cuál es el objetivo principal del área de Investigación y Desarrollo (I+D) en nuestra organización?",
        options: [
          { value: "5", label: "El objetivo principal del área de I+D es impulsar la innovación y el desarrollo de productos o servicios de vanguardia que nos posicionen como líderes en nuestro mercado" },
          { value: "3", label: "El área de I+D tiene como objetivo principal el desarrollo y la mejora de productos o servicios existentes, aunque aún hay margen para explorar nuevas oportunidades de innovación" },
          { value: "1", label: "El área de I+D no tiene un objetivo principal claramente definido o no está contribuyendo de manera significativa a la innovación en la organización, lo que requiere una revisión urgente de su enfoque y estrategia" },
        ]
      },
      {
        number: 2,
        text: "¿Cuáles son los proyectos de investigación y desarrollo actuales en los que está trabajando el equipo de I+D?",
        options: [
          { value: "5", label: "Nuestro equipo de I+D está involucrado en proyectos altamente innovadores y estratégicos que tienen el potencial de transformar nuestra industria y generar un gran valor para la organización" },
          { value: "3", label: "El equipo de I+D está trabajando en proyectos importantes, aunque algunos de ellos pueden considerarse más rutinarios o menos estratégicos en comparación con otros" },
          { value: "1", label: "El equipo de I+D no está trabajando en proyectos significativos de investigación y desarrollo en este momento, lo que sugiere la necesidad de revisar y redefinir nuestras prioridades en esta área" },
        ]
      },
      {
        number: 3,
        text: "¿Qué recursos (humanos, tecnológicos, financieros) se han asignado al área de I+D?",
        options: [
          { value: "5", label: "Hemos asignado recursos significativos y de alta calidad al área de I+D, incluyendo un equipo talentoso, tecnología de vanguardia y una inversión financiera sólida para impulsar la innovación" },
          { value: "3", label: "Hemos asignado algunos recursos al área de I+D, aunque aún hay margen para aumentar la inversión y fortalecer nuestro equipo y tecnología" },
          { value: "1", label: "Los recursos asignados al área de I+D son limitados o insuficientes, lo que representa un obstáculo importante para nuestra capacidad de innovación y desarrollo" },
        ]
      },
      {
        number: 4,
        text: "¿Cuál es el presupuesto anual destinado a actividades de I+D?",
        options: [
          { value: "5", label: "Tenemos un presupuesto anual significativo y sólido destinado a actividades de I+D que nos permite llevar a cabo proyectos innovadores y estratégicos" },
          { value: "3", label: "Contamos con un presupuesto anual para actividades de I+D, aunque este podría aumentar para respaldar proyectos más ambiciosos y de mayor impacto" },
          { value: "1", label: "Nuestro presupuesto anual para actividades de I+D es limitado o insuficiente, lo que podría limitar nuestra capacidad de innovación y desarrollo" },
        ]
      },
      {
        number: 5,
        text: "¿Existen procedimientos establecidos para el seguimiento y control de los proyectos de I+D? Si es así, ¿cómo se lleva a cabo este seguimiento?",
        options: [
          { value: "5", label: "Tenemos procedimientos sólidos y altamente efectivos para el seguimiento y control de proyectos de I+D, que incluyen hitos claramente definidos, métricas de rendimiento y revisión regular del progreso" },
          { value: "3", label: "Contamos con algunos procedimientos para el seguimiento y control de proyectos de I+D, aunque podríamos mejorar la estructura y rigor en la gestión de estos proyectos" },
          { value: "1", label: "No tenemos procedimientos establecidos para el seguimiento y control de proyectos de I+D, lo que representa un desafío significativo en la gestión de estos proyectos" },
        ]
      },
      {
        number: 6,
        text: "¿Qué metodologías se utilizan para la gestión de proyectos de I+D (por ejemplo, Agile, Waterfall)?",
        options: [
          { value: "5", label: "Utilizamos metodologías avanzadas y ágiles, como Agile o Scrum, que nos permiten gestionar proyectos de I+D de manera eficiente y adaptarnos rápidamente a cambios" },
          { value: "3", label: "Utilizamos algunas metodologías de gestión de proyectos de I+D, aunque podríamos diversificar y mejorar nuestra selección para adaptarnos mejor a las necesidades de cada proyecto" },
          { value: "1", label: "No utilizamos metodologías específicas para la gestión de proyectos de I+D o dependemos en gran medida de enfoques tradicionales como Waterfall, lo que podría limitar nuestra capacidad de innovación" },
        ]
      },
      {
        number: 7,
        text: "¿Cómo se promueve la colaboración y el intercambio de ideas entre el equipo de I+D y otros departamentos de la organización?",
        options: [
          { value: "5", label: "Fomentamos activamente la colaboración y el intercambio de ideas entre el equipo de I+D y otros departamentos mediante reuniones regulares, proyectos conjuntos y una cultura de innovación abierta" },
          { value: "3", label: "Existe algún grado de colaboración e intercambio de ideas entre el equipo de I+D y otros departamentos, pero podríamos mejorar nuestras prácticas y procesos para promoverlo de manera más efectiva" },
          { value: "1", label: "La colaboración y el intercambio de ideas entre el equipo de I+D y otros departamentos son limitados o inexistentes, lo que podría ser un obstáculo para la innovación y el desarrollo conjunto de proyectos" },
        ]
      },
      {
        number: 8,
        text: "¿Se realizan análisis de competitividad y benchmarking en el área de I+D? ¿Cuáles han sido los principales hallazgos?",
        options: [
          { value: "5", label: "Realizamos análisis de competitividad y benchmarking de manera regular y sistemática en el área de I+D, lo que nos ha permitido identificar oportunidades de mejora y mantenernos a la vanguardia en innovación" },
          { value: "3", label: "Realizamos ocasionalmente análisis de competitividad y benchmarking en el área de I+D, aunque podríamos hacerlo de manera más regular para obtener mejores perspectivas de la competencia y el mercado" },
          { value: "1", label: "No realizamos análisis de competitividad ni benchmarking en el área de I+D, lo que limita nuestra capacidad para evaluar nuestro desempeño en comparación con otros y detectar áreas de mejora" },
        ]
      },
      {
        number: 9,
        text: "¿Se miden y evalúan los resultados y el impacto de las actividades de I+D? ¿Qué indicadores se utilizan?",
        options: [
          { value: "5", label: "Medimos y evaluamos de manera sistemática los resultados y el impacto de las actividades de I+D utilizando indicadores clave como retorno de la inversión (ROI), tiempo de comercialización, número de patentes, y satisfacción del cliente" },
          { value: "3", label: "Realizamos alguna medición y evaluación de los resultados de I+D, aunque podríamos mejorar en la selección y seguimiento de indicadores para evaluar de manera más completa el impacto" },
          { value: "1", label: "No medimos ni evaluamos sistemáticamente los resultados o el impacto de las actividades de I+D, lo que dificulta la comprensión de su efectividad" },
        ]
      },
      {
        number: 10,
        text: "¿Se lleva a cabo una gestión del conocimiento en el área de I+D? ¿Cómo se captura, comparte y aprovecha el conocimiento generado?",
        options: [
          { value: "5", label: "Realizamos una gestión integral del conocimiento en el área de I+D, donde capturamos, compartimos y aprovechamos el conocimiento de manera efectiva mediante bases de datos, reuniones de intercambio y una cultura de aprendizaje continuo" },
          { value: "3", label: "Realizamos alguna gestión del conocimiento en el área de I+D, aunque podríamos mejorar en la formalización y sistematización de procesos para una mejor captura y aprovechamiento del conocimiento" },
          { value: "1", label: "No llevamos a cabo una gestión del conocimiento en el área de I+D, lo que puede limitar nuestra capacidad para capitalizar el conocimiento generado" },
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
    
    const maxScore = 50; // Puntuación máxima posible: 10 preguntas con valor máximo de 3 cada una
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
            Investigación y Desarrollo
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
              Ver Resultados
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CuestionarioInvestigacionDesarrollo;