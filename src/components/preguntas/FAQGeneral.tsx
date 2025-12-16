import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    category: "Preguntas generales",
    question: "¿Qué documentos necesito para atenderme en EsSalud?",
    answer:
      "Solo necesitas tu DNI y estar acreditado como asegurado. El personal verificará tu información en el sistema antes de tu atención.",
  },
  {
    category: "Preguntas generales",
    question: "¿Qué servicios brinda EsSalud?",
    answer:
      "Brinda atención médica general y especializada, hospitalización, farmacia, laboratorio, rehabilitación, maternidad, odontología, emergencias 24 horas y orientación digital mediante el chatbot y la línea telefónica.",
  },
  {
    category: "Preguntas generales",
    question: "¿Qué hago si no puedo acudir a mi cita?",
    answer:
      "Puedes reprogramarla o cancelarla a través del Asesor Virtual o en tu centro de salud. De esta manera, otro asegurado puede aprovechar el espacio disponible.",
  },

  {
    category: "Afiliación y cobertura",
    question: "¿Cómo sé si estoy afiliado(a) a EsSalud?",
    answer:
      "Puedes verificar tu afiliación en el portal de EsSalud ingresando tu número de DNI, consultar con el Asesor Virtual o llamar a la central 411-8000, opción 1.",
  },
  {
    category: "Afiliación y cobertura",
    question: "¿Puedo afiliar a mis familiares?",
    answer:
      "Sí. Los asegurados titulares pueden afiliar a sus derechohabientes (cónyuge, conviviente, hijos menores o estudiantes y madres gestantes) cumpliendo los requisitos establecidos por EsSalud.",
  },
  {
    category: "Afiliación y cobertura",
    question:
      "¿Qué hago si ya no trabajo, pero sigo necesitando atención médica?",
    answer:
      "Si cesaste en tu empleo, puedes mantener la cobertura hasta por dos meses adicionales según el régimen de aportes. También puedes acceder al Seguro Potestativo para continuar con tu atención.",
  },

  {
    category: "Citas y atención médica",
    question: "¿Puedo atenderme si cambié de centro laboral?",
    answer:
      "Sí. Tu afiliación permanece activa siempre que tu nuevo empleador te registre en planilla. Si cambiaste de distrito o red asistencial, deberás actualizar tu centro de adscripción.",
  },
  {
    category: "Citas y atención médica",
    question: "¿Puedo sacar cita para otra persona?",
    answer:
      "Sí, siempre que sea un familiar directo registrado como derechohabiente. Puedes hacerlo a través del chatbot Dialogix, la web de EsSalud o la línea telefónica 411-8000.",
  },
  {
    category: "Citas y atención médica",
    question: "¿Qué debo hacer si olvidé mi cita médica?",
    answer:
      "Si no acudiste, puedes reprogramarla desde el chatbot o en tu centro asistencial. Es importante cancelar o reagendar con anticipación para no perder el turno asignado.",
  },
  {
    category: "Citas y atención médica",
    question: "¿Puedo atenderme en un hospital distinto al mío?",
    answer:
      "Solo en casos de emergencia médica puedes ser atendido en cualquier centro de EsSalud del país. Para consultas regulares debes acudir al establecimiento donde estás adscrito.",
  },

  {
    category: "Servicios digitales",
    question: "¿Qué es el Asesor Virtual (Dialogix)?",
    answer:
      "Es el chatbot oficial de EsSalud, disponible las 24 horas, que permite agendar citas, consultar tu afiliación, verificar resultados o recibir orientación médica básica.",
  },
  {
    category: "Servicios digitales",
    question: "¿Puedo consultar mis resultados de laboratorio por internet?",
    answer:
      "Sí. Desde la plataforma “EsSalud en Línea” o mediante el Asesor Virtual puedes acceder a tus resultados de laboratorio y revisar tu historial de atenciones médicas.",
  },

  {
    category: "Atención y emergencias",
    question: "¿EsSalud atiende emergencias las 24 horas?",
    answer:
      "Sí. Todos los hospitales de EsSalud cuentan con servicios de emergencia activos las 24 horas del día, los 7 días de la semana.",
  },
  {
    category: "Atención y emergencias",
    question:
      "¿Qué hago si necesito atención urgente y no puedo llegar a mi hospital asignado?",
    answer:
      "Puedes acudir al centro asistencial de EsSalud más cercano. La atención de emergencia está garantizada en todo el territorio nacional.",
  },

  {
    category: "Trámites y seguros",
    question: "¿Cómo actualizo mis datos personales o de mis derechohabientes?",
    answer:
      "Puedes hacerlo en los módulos de Acreditación de tu centro asistencial o a través de la plataforma “EsSalud en Línea”.",
  },
  {
    category: "Trámites y seguros",
    question: "¿Qué es el Seguro Potestativo de EsSalud?",
    answer:
      "Es un seguro dirigido a personas que no están en planilla ni cubiertas por un empleador. Permite acceder voluntariamente a los servicios de salud pagando una prima mensual.",
  },
];

export default function FAQGeneral({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return faqs;
    const term = search.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(term) ||
        f.answer.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                rounded-xl border transition-all bg-white
                ${
                  isOpen
                    ? "border-blue-300 shadow-md"
                    : "border-gray-200 hover:shadow-sm"
                }
              `}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="
                  w-full flex items-center justify-between 
                  px-6 py-4 text-left cursor-pointer
                "
                >
                  <div className="pr-4">
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {faq.question}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {faq.category}
                    </p>
                  </div>

                  <span
                    className={`
    ml-3 text-gray-400 transition-transform duration-300
    ${isOpen ? "rotate-180" : "rotate-0"}
  `}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div
                  className={`
                  overflow-hidden transition-all duration-300 
                  ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              No encontramos resultados con “{search}”. Intenta con otra palabra
              clave.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
