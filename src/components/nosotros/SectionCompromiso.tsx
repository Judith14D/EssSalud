import { Check } from "lucide-react";

export default function SectionCompromiso() {
  return (
    <section className="w-full bg-[#F9FAFC] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
          Comprometidos con brindar la mejor experiencia en salud
        </h2>

        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-base leading-relaxed">
            En EsSalud trabajamos cada día para ofrecer una atención médica
            integral, oportuna y de calidad, centrada en las necesidades de
            nuestros asegurados. Nuestra misión es proteger la salud y la vida
            de todos los peruanos, garantizando un servicio humano, moderno e
            innovador. Creemos que la atención médica va más allá del
            tratamiento: incluye prevención, acompañamiento y educación para un
            Perú más saludable.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center md:text-left px-6">
          <div className="flex justify-center md:justify-start">
            <div className="w-11 h-11 bg-[#A7C8FF] rounded-full flex items-center justify-center shadow-sm">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">
            Atención integral de calidad
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Ofrecemos servicios médicos que cubren todas las etapas de la vida:
            desde la prevención y el diagnóstico hasta la recuperación y
            rehabilitación del paciente.
          </p>
        </div>

        <div className="text-center md:text-left px-6">
          <div className="flex justify-center md:justify-start">
            <div className="w-11 h-11 bg-[#A7C8FF] rounded-full flex items-center justify-center shadow-sm">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">
            Bienestar físico y emocional
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Cuidamos a cada persona de manera integral, promoviendo hábitos
            saludables, atención oportuna y un entorno empático y solidario.
          </p>
        </div>

        <div className="text-center md:text-left px-6">
          <div className="flex justify-center md:justify-start">
            <div className="w-11 h-11 bg-[#A7C8FF] rounded-full flex items-center justify-center shadow-sm">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">
            Educación y autocuidado
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Fomentamos la cultura de la prevención a través de campañas y
            programas educativos, empoderando a nuestros asegurados para que
            participen activamente en su propio bienestar.
          </p>
        </div>
      </div>
    </section>
  );
}
