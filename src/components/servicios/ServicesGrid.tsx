import { Brain, HeartPulse, Baby, Eye, Stethoscope } from "lucide-react";

const services = [
  {
    title: "Salud Mental",
    icon: Brain,
    description:
      "Atención especializada en el diagnóstico, tratamiento y seguimiento de trastornos de salud mental para adultos y adolescentes.",
    features: [
      "Evaluación psiquiátrica",
      "Tratamiento farmacológico",
      "Atención en crisis",
    ],
  },
  {
    title: "Cardiología",
    icon: HeartPulse,
    description:
      "Servicio orientado al diagnóstico y manejo de enfermedades cardiovasculares, con evaluación oportuna y seguimiento clínico.",
    features: [
      "Electrocardiograma (ECG)",
      "Evaluación de riesgo cardiovascular",
      "Control de enfermedades cardiacas",
    ],
  },
  {
    title: "Neurología",
    icon: Brain,
    description:
      "Atención especializada para enfermedades del sistema nervioso central y periférico, con evaluaciones diagnósticas según cada caso.",
    features: [
      "Evaluación neurológica",
      "Manejo de enfermedades crónicas",
      "Seguimiento de pacientes neurológicos",
    ],
  },
  {
    title: "Pediatría",
    icon: Baby,
    description:
      "Atención integral de salud para niños y adolescentes con enfoque preventivo, diagnóstico y tratamiento oportuno.",
    features: [
      "Controles de crecimiento y desarrollo",
      "Vacunación según esquema nacional",
      "Atención de enfermedades frecuentes",
    ],
  },
  {
    title: "Oftalmología",
    icon: Eye,
    description:
      "Evaluación y tratamiento de enfermedades oculares, así como control de alteraciones visuales en diferentes grupos etarios.",
    features: [
      "Medición de agudeza visual",
      "Atención de patologías oculares",
      "Control y seguimiento oftalmológico",
    ],
  },
  {
    title: "Medicina General",
    icon: Stethoscope,
    description:
      "Atención primaria orientada al diagnóstico inicial, seguimiento de enfermedades comunes y derivación a especialidades cuando corresponda.",
    features: [
      "Chequeos clínicos básicos",
      "Diagnóstico y manejo inicial",
      "Derivación a especialidades",
    ],
  },
];

export default function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-14">
        Brindamos los mejores servicios médicos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, i) => {
          const Icon = service.icon;

          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#8EC2FF] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="bg-[#EFF3F8] rounded-xl p-4 mb-6">
                {service.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-5 rounded-full bg-[#8EC2FF] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="white"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="bg-[#8EC2FF] hover:bg-[#7bb3f7] text-white text-sm font-medium px-6 py-2 rounded-lg">
                  Ver más
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
