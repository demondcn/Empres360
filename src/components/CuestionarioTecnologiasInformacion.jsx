"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioTecnologiasInformacion = ({ onNavigate }) => {
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
        text: "¿Cuál es el propósito principal de la función de Tecnologías de la Información en nuestra organización?",
        options: [
          { value: "5", label: "El propósito principal de la función de Tecnologías de la Información en nuestra organización es impulsar la innovación, mejorar la eficiencia operativa y brindar soluciones tecnológicas avanzadas que respalden la estrategia y el crecimiento de la empresa." },
          { value: "3", label: "La función de Tecnologías de la Información tiene como propósito mejorar la infraestructura tecnológica y garantizar el funcionamiento de sistemas y aplicaciones, aunque aún hay oportunidades para aprovechar plenamente su potencial estratégico." },
          { value: "1", label: "La función de Tecnologías de la Información tiene un propósito limitado y se enfoca principalmente en mantener la infraestructura existente sin contribuir significativamente a la estrategia de la organización, lo que requiere una revisión de su papel en la empresa." },
        ]
      },
      {
        number: 2,
        text: "¿Qué estrategias se han implementado para alinear la TI con los objetivos comerciales de la empresa?",
        options: [
          { value: "5", label: "Hemos implementado estrategias integrales que garantizan una alineación perfecta de la TI con nuestros objetivos comerciales, con un enfoque estratégico y una inversión significativa en tecnología." },
          { value: "3", label: "Hemos implementado algunas estrategias para alinear la TI con los objetivos comerciales, aunque aún hay áreas en las que podemos mejorar y fortalecer esta alineación." },
          { value: "1", label: "No hemos implementado estrategias significativas para alinear la TI con los objetivos comerciales, lo que requiere una atención urgente para mejorar nuestra estrategia tecnológica." },
        ]
      },
      {
        number: 3,
        text: "¿Qué medidas se están tomando para garantizar la seguridad de la información y proteger los datos de la empresa?",
        options: [
          { value: "5", label: "Hemos implementado un conjunto completo de medidas de seguridad de la información y protección de datos que cumplen con los estándares más altos, incluyendo sistemas de encriptación avanzados, capacitación regular en ciberseguridad y una política de acceso estrictamente controlada." },
          { value: "3", label: "Hemos tomado algunas medidas para garantizar la seguridad de la información y proteger los datos, aunque aún hay áreas en las que podemos fortalecer nuestras prácticas de seguridad." },
          { value: "1", label: "No hemos tomado medidas significativas para garantizar la seguridad de la información y proteger los datos de la empresa, lo que representa un riesgo significativo que requiere una revisión urgente de nuestras políticas de seguridad." },
        ]
      },
      {
        number: 4,
        text: "¿Cuáles son las principales inversiones en tecnología que se han realizado en los últimos años?",
        options: [
          { value: "5", label: "Hemos realizado inversiones significativas en tecnología, incluyendo la implementación de sistemas avanzados de gestión, actualización de infraestructura de servidores y adopción de tecnologías emergentes como la inteligencia artificial y el Internet de las cosas (IoT)." },
          { value: "3", label: "Hemos realizado algunas inversiones en tecnología, como la actualización de software y hardware, aunque aún hay margen para inversiones más estratégicas." },
          { value: "1", label: "No hemos realizado inversiones significativas en tecnología en los últimos años, lo que requiere una revisión urgente de nuestra estrategia tecnológica." },
        ]
      },
      {
        number: 5,
        text: "¿Cuál es el estado actual de la infraestructura tecnológica de la empresa? (redes, servidores, software, etc.)",
        options: [
          { value: "5", label: "Nuestra infraestructura tecnológica se encuentra en un estado excelente, con sistemas actualizados, redes de alta velocidad y servidores de vanguardia que respaldan eficientemente nuestras operaciones." },
          { value: "3", label: "La infraestructura tecnológica de la empresa está en un estado aceptable, aunque algunos sistemas pueden necesitar actualizaciones y mejoras para alcanzar su pleno potencial." },
          { value: "1", label: "El estado de nuestra infraestructura tecnológica es deficiente, con sistemas obsoletos, problemas de red y servidores poco confiables, lo que requiere una inversión urgente en actualización y mejora." },
        ]
      },
      {
        number: 6,
        text: "¿Qué medidas se han tomado para garantizar la disponibilidad y el rendimiento de los sistemas informáticos?",
        options: [
          { value: "5", label: "Hemos implementado medidas exhaustivas que garantizan la disponibilidad y el rendimiento óptimo de nuestros sistemas informáticos, incluyendo redundancia de servidores, monitoreo constante y mantenimiento preventivo." },
          { value: "3", label: "Hemos tomado algunas medidas para garantizar la disponibilidad y el rendimiento de los sistemas informáticos, aunque aún hay áreas en las que podemos mejorar y fortalecer nuestras prácticas." },
          { value: "1", label: "No hemos tomado medidas significativas para garantizar la disponibilidad y el rendimiento de los sistemas informáticos, lo que representa un riesgo significativo que requiere una revisión urgente de nuestras políticas de gestión de sistemas." },
        ]
      },
      {
        number: 7,
        text: "¿Qué procesos de gestión de proyectos se están utilizando en el área de TI?",
        options: [
          { value: "5", label: "Estamos utilizando procesos de gestión de proyectos de clase mundial en el área de TI, como el enfoque ágil y las mejores prácticas de PMI (Project Management Institute) para garantizar la ejecución eficiente y exitosa de nuestros proyectos." },
          { value: "3", label: "Utilizamos algunos procesos de gestión de proyectos en el área de TI, aunque aún hay áreas donde podemos fortalecer nuestras prácticas y adoptar enfoques más avanzados." },
          { value: "1", label: "No utilizamos procesos significativos de gestión de proyectos en el área de TI, lo que requiere una revisión urgente de nuestras prácticas para mejorar la ejecución de proyectos tecnológicos." },
        ]
      },
      {
        number: 8,
        text: "¿Cómo se mide y evalúa el rendimiento del área de TI?",
        options: [
          { value: "5", label: "Medimos y evaluamos el rendimiento del área de TI de manera exhaustiva, utilizando indicadores clave de rendimiento (KPI) alineados con los objetivos comerciales, evaluaciones de satisfacción del cliente interno y auditorías periódicas de seguridad." },
          { value: "3", label: "Realizamos alguna medición y evaluación del rendimiento del área de TI, aunque aún hay áreas en las que podemos mejorar y adoptar enfoques más avanzados." },
          { value: "1", label: "No medimos ni evaluamos de manera significativa el rendimiento del área de TI, lo que requiere una revisión urgente de nuestras prácticas para garantizar la eficiencia y la alineación con los objetivos comerciales." },
        ]
      },
      {
        number: 9,
        text: "¿Cuáles son los principales desafíos actuales en términos de tecnología de la información en nuestra organización?",
        options: [
          { value: "5", label: "Estamos abordando de manera efectiva los desafíos actuales en tecnología de la información y hemos implementado estrategias sólidas para superarlos." },
          { value: "3", label: "Hemos identificado algunos desafíos en tecnología de la información y estamos trabajando en soluciones, aunque aún hay trabajo por hacer." },
          { value: "1", label: "Los desafíos en tecnología de la información son significativos y no hemos tomado medidas efectivas para abordarlos, lo que requiere atención inmediata." },
        ]
      },
      {
        number: 10,
        text: "¿Qué planes y metas se tienen establecidos para el desarrollo futuro del área de TI?",
        options: [
          { value: "5", label: "Tenemos planes y metas sólidos y bien definidos para el desarrollo futuro del área de TI, incluyendo inversiones estratégicas y objetivos claros alineados con la visión de la empresa." },
          { value: "3", label: "Tenemos algunos planes y metas establecidos para el desarrollo futuro del área de TI, aunque aún hay áreas en las que podemos mejorar la definición y la ejecución de estos planes." },
          { value: "1", label: "No tenemos planes ni metas significativas establecidos para el desarrollo futuro del área de TI, lo que requiere una atención urgente para definir una estrategia tecnológica sólida." },
        ]
      },
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

  // Modificar calculatePercentage en lugar de calculateAverage
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
            Tecnologias de la Información
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

export default CuestionarioTecnologiasInformacion;