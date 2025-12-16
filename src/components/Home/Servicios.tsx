import React, { useState } from "react";
import {
  HeartPulse,
  Baby,
  Eye,
  Brain,
  Bone,
  Syringe,
  FlaskConical,
  Microscope,
  Stethoscope,
  Activity,
} from "lucide-react";

type ServiceCard = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

type ServiceCategory = "emergencia" | "medicas" | "laboratorio" | "quirurgicos";

type ServicesDataType = Record<ServiceCategory, ServiceCard[]>;

const servicesData: ServicesDataType = {
  emergencia: [
    {
      icon: <HeartPulse className="w-10 h-10 text-[#245AB8]" />,
      title: "Cardiología",
      text: "Atención especializada para enfermedades del corazón, evaluación de riesgos y manejo de condiciones cardiovasculares en pacientes de emergencia.",
    },
    {
      icon: <Baby className="w-10 h-10 text-[#245AB8]" />,
      title: "Pediatría",
      text: "Atención a niñas y niños en situaciones de urgencia, brindando evaluación y manejo inicial de enfermedades frecuentes en la infancia.",
    },
    {
      icon: <Eye className="w-10 h-10 text-[#245AB8]" />,
      title: "Oftalmología",
      text: "Evaluación de problemas oculares urgentes como golpes, infecciones, disminución súbita de la visión o irritación severa.",
    },
    {
      icon: <Brain className="w-10 h-10 text-[#245AB8]" />,
      title: "Neurología",
      text: "Atención inicial para eventos neurológicos agudos, como convulsiones, cefaleas intensas, debilidad repentina o problemas de coordinación.",
    },
  ],

  medicas: [
    {
      icon: <HeartPulse className="w-10 h-10 text-[#245AB8]" />,
      title: "Cardiología Avanzada",
      text: "Evaluación y seguimiento de enfermedades cardiovasculares crónicas, arritmias y factores de riesgo en adultos.",
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-[#245AB8]" />,
      title: "Odontología",
      text: "Atención integral en salud bucal, incluyendo diagnósticos, limpiezas, tratamientos restaurativos y manejo de infecciones dentales.",
    },
    {
      icon: <Activity className="w-10 h-10 text-[#245AB8]" />,
      title: "Genética",
      text: "Servicios de asesoramiento y estudios para la identificación de enfermedades hereditarias y trastornos congénitos.",
    },
    {
      icon: <Activity className="w-10 h-10 text-[#245AB8]" />,
      title: "Neumología",
      text: "Diagnóstico y control de enfermedades respiratorias como asma, EPOC, infecciones pulmonares y trastornos del sueño.",
    },
  ],

  laboratorio: [
    {
      icon: <FlaskConical className="w-10 h-10 text-[#245AB8]" />,
      title: "Análisis de sangre",
      text: "Exámenes básicos y especializados para evaluar parámetros generales, niveles hormonales, marcadores infecciosos y más.",
    },
    {
      icon: <Microscope className="w-10 h-10 text-[#245AB8]" />,
      title: "Biopsias",
      text: "Toma y evaluación de muestras de tejido para detectar lesiones, tumores o procesos inflamatorios.",
    },
    {
      icon: <Syringe className="w-10 h-10 text-[#245AB8]" />,
      title: "Microbiología",
      text: "Estudios para identificar bacterias, virus y hongos causantes de infecciones, permitiendo un tratamiento adecuado.",
    },
    {
      icon: <Activity className="w-10 h-10 text-[#245AB8]" />,
      title: "Inmunología",
      text: "Pruebas destinadas a evaluar el sistema inmunitario y diagnosticar enfermedades autoinmunes o alérgicas.",
    },
  ],

  quirurgicos: [
    {
      icon: <Activity className="w-10 h-10 text-[#245AB8]" />,
      title: "Cirugía General",
      text: "Procedimientos quirúrgicos para tratar afecciones abdominales, hernias, infecciones y otros problemas comunes.",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-[#245AB8]" />,
      title: "Cirugía Cardíaca",
      text: "Intervenciones especializadas para corregir enfermedades del corazón y los vasos sanguíneos.",
    },
    {
      icon: <Bone className="w-10 h-10 text-[#245AB8]" />,
      title: "Traumatología",
      text: "Atención y cirugía para lesiones óseas, fracturas y afecciones del sistema musculoesquelético.",
    },
    {
      icon: <Eye className="w-10 h-10 text-[#245AB8]" />,
      title: "Cirugía Ocular",
      text: "Procedimientos para corregir cataratas, lesiones oculares, problemas de retina y otras patologías visuales.",
    },
  ],
};

export const Servicios = () => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>("emergencia");

  const tabs = [
    { id: "emergencia", label: "Servicios de Emergencia" },
    { id: "medicas", label: "Especialidades Médicas" },
    { id: "laboratorio", label: "Diagnósticos y Laboratorio" },
    { id: "quirurgicos", label: "Servicios Quirúrgicos" },
  ] as const;

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-[#245AB8] mb-8">Servicios</h2>

        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-4 w-full max-w-[1020px] bg-[#95A6FE] px-2 py-2 rounded-[11px] gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={
                  "px-4 py-1 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300 " +
                  (activeTab === t.id
                    ? "bg-white shadow-md text-[#245AB8]"
                    : "text-gray-600 hover:text-white")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1020px] grid md:grid-cols-4 gap-6 mt-8">
          {servicesData[activeTab].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center transition hover:shadow-lg cursor-pointer"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
