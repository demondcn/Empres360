"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BarChart2, Check } from "lucide-react";

const CuestionarioTalentoHumano = ({ onNavigate }) => {
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
        text: "¿Cuál es el nivel de participación de Recursos Humanos en la toma de decisiones estratégicas de la empresa?",
        options: [
          { value: "5", label: "Recursos Humanos desempeña un papel fundamental en la toma de decisiones estratégicas de la empresa. Sus aportes y recomendaciones se consideran de alto valor y se integran activamente en el proceso de toma de decisiones." },
          { value: "3", label: "Recursos Humanos tiene cierta participación en la toma de decisiones estratégicas de la empresa. Sus contribuciones se consideran importantes en algunas áreas, pero no están plenamente integradas en todas las decisiones." },
          { value: "1", label: "Recursos Humanos tiene una participación limitada en la toma de decisiones estratégicas de la empresa. Su influencia es mínima, y sus aportes rara vez se consideran en el proceso de toma de decisiones." },
        ]
      },
      {
        number: 2,
        text: "¿Existe un plan estratégico de recursos humanos alineado con los objetivos y metas de la organización?",
        options: [
          { value: "5", label: "Sí, la organización cuenta con un plan estratégico de recursos humanos perfectamente alineado con los objetivos y metas. Este plan se actualiza regularmente y se considera esencial para el éxito de la empresa." },
          { value: "3", label: "Sí, existe un plan estratégico de recursos humanos que está en cierta medida alineado con los objetivos y metas de la organización. Sin embargo, puede haber áreas donde se requiere una mayor alineación o actualización." },
          { value: "1", label: "No, actualmente no existe un plan estratégico de recursos humanos claramente alineado con los objetivos y metas de la organización, o dicho plan es inexistente o poco efectivo." },
        ]
      },
      {
        number: 3,
        text: "¿Qué medidas se han implementado para mejorar la retención de talento en la empresa?",
        options: [
          { value: "5", label: "Se han implementado una variedad de medidas altamente efectivas para mejorar la retención de talento. Esto incluye programas de desarrollo profesional, beneficios competitivos, reconocimiento y oportunidades de crecimiento que han demostrado retener a los empleados de manera significativa." },
          { value: "3", label: "Se han implementado algunas medidas para mejorar la retención de talento en la empresa. Aunque han tenido un impacto positivo en algunos casos, es posible que se necesiten más esfuerzos." },
          { value: "1", label: "Hasta el momento, se han implementado medidas limitadas o ninguna medida específica para mejorar la retención de talento en la empresa. Esto podría estar afectando la retención de empleados de manera significativa." },
        ]
      },
      {
        number: 4,
        text: "¿Se lleva a cabo una evaluación formal del desempeño de los empleados de manera regular?",
        options: [
          { value: "5", label: "Sí, realizamos evaluaciones formales de desempeño regularmente y las utilizamos para tomar decisiones clave de desarrollo y reconocimiento." },
          { value: "3", label: "En ciertas ocasiones, realizamos evaluaciones formales del desempeño, pero no de manera regular ni de manera consistente." },
          { value: "1", label: "No realizamos evaluaciones formales del desempeño de manera regular, o nunca las llevamos a cabo en nuestra empresa." },
        ]
      },
      {
        number: 5,
        text: "¿Cuál es el nivel de satisfacción de los empleados en temas de comunicación interna y clima laboral?",
        options: [
          { value: "5", label: "Nuestros empleados están altamente satisfechos con la comunicación interna y el clima laboral, y consideran que son excelentes aspectos de nuestra empresa." },
          { value: "3", label: "Los empleados muestran un nivel de satisfacción razonable en cuanto a comunicación interna y clima laboral, pero hay margen para mejoras." },
          { value: "1", label: "El nivel de satisfacción de los empleados en temas de comunicación interna y clima laboral es insatisfactorio, y necesitamos tomar medidas significativas para mejorar estos aspectos." },
        ]
      },
      {
        number: 6,
        text: "¿Qué acciones se han implementado para promover la diversidad e inclusión en la organización?",
        options: [
          { value: "5", label: "Hemos implementado una amplia gama de iniciativas de diversidad e inclusión, incluyendo programas de capacitación, políticas inclusivas, grupos de afinidad y una cultura de inclusión sólida." },
          { value: "3", label: "Hemos tomado algunas medidas para promover la diversidad e inclusión, como capacitación ocasional y políticas básicas, pero aún hay margen para mejoras significativas." },
          { value: "1", label: "No hemos tomado medidas significativas para promover la diversidad e inclusión en nuestra organización, y es un área en la que necesitamos tomar acciones urgentes." },
        ]
      },
      {
        number: 7,
        text: "¿Se han realizado esfuerzos para mejorar el proceso de reclutamiento y selección de personal?",
        options: [
          { value: "5", label: "Hemos implementado mejoras significativas en nuestro proceso de reclutamiento y selección, como la adopción de tecnología avanzada y la optimización de nuestras prácticas para atraer y retener talento de alta calidad." },
          { value: "3", label: "Hemos realizado algunas mejoras en el proceso de reclutamiento y selección, pero aún hay áreas donde podemos hacer más mejoras para garantizar una selección más efectiva de personal." },
          { value: "1", label: "No hemos realizado esfuerzos significativos para mejorar el proceso de reclutamiento y selección, y es necesario tomar medidas urgentes para hacerlo." },
        ]
      },
      {
        number: 8,
        text: "¿Existe un plan de capacitación y desarrollo para los empleados de la organización?",
        options: [
          { value: "5", label: "Sí, contamos con un plan de capacitación y desarrollo integral que abarca a todos los empleados y se actualiza regularmente para promover su crecimiento profesional y personal." },
          { value: "3", label: "Tenemos algunos programas de capacitación y desarrollo, pero no son exhaustivos ni se actualizan con regularidad." },
          { value: "1", label: "No tenemos un plan estructurado de capacitación y desarrollo para nuestros empleados, lo que requiere una atención inmediata." },
        ]
      },
      {
        number: 9,
        text: "¿Qué medidas se han tomado para promover el equilibrio entre trabajo y vida personal de los empleados?",
        options: [
          { value: "5", label: "Hemos implementado una amplia gama de medidas que incluyen flexibilidad de horarios, programas de bienestar y apoyo para cuidado de hijos/dependientes, lo que permite a nuestros empleados lograr un equilibrio óptimo entre trabajo y vida personal." },
          { value: "3", label: "Hemos tomado algunas medidas para promover el equilibrio entre trabajo y vida personal, como horarios flexibles en ciertas situaciones, pero aún hay espacio para mejoras y expansión de estas iniciativas." },
          { value: "1", label: "No hemos tomado medidas significativas para promover el equilibrio entre trabajo y vida personal de nuestros empleados, y es necesario hacerlo para mejorar la calidad de vida en la organización." },
        ]
      },
      {
        number: 10,
        text: "¿Cómo se mide el impacto de las acciones de Recursos Humanos en el rendimiento global de la empresa?",
        options: [
          { value: "5", label: "Medimos el impacto de las acciones de Recursos Humanos de manera exhaustiva y cuantitativa, utilizando KPIs específicos y realizando análisis de datos para evaluar su influencia directa en el rendimiento global de la empresa." },
          { value: "3", label: "Realizamos algunas mediciones del impacto de las acciones de Recursos Humanos, pero no de manera completa ni sistemática, y hay margen para mejorar nuestra evaluación." },
          { value: "1", label: "No medimos el impacto de las acciones de Recursos Humanos en el rendimiento global de la empresa, lo que requiere una atención urgente para comprender y mejorar esta relación." },
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
            Talento Humano
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

export default CuestionarioTalentoHumano;