import { Check } from "lucide-react";
import doctorImage from "../../assets/images/NoticiaPrincipal.png";

export default function HeroNosotros() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="flex justify-center">
        <img
          src={doctorImage}
          alt="Profesionales de salud EsSalud"
          className="w-full h-[500px] max-w-md rounded-xl object-cover shadow-sm"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold leading-snug text-gray-900 mb-4">
          Tu red de salud confiable con <br />
          más de 85 años de experiencia
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Durante más de ocho décadas (desde 1936), EsSalud ha sido el pilar del
          bienestar y la protección social en el Perú. A lo largo de estos años,
          hemos fortalecido la confianza de millones de asegurados, ofreciendo
          atención médica integral con calidez, profesionalismo e innovación
          constante.
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-10">
          Nuestro equipo de profesionales de la salud trabaja cada día con
          compromiso y vocación de servicio para cuidar lo más valioso: tu salud
          y la de tu familia.
        </p>

        <ul className="space-y-7">
          <li className="flex items-start gap-4">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D9EBFF]">
              <Check className="w-5 h-5 text-[#1A73E8]" strokeWidth={3} />
            </span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Excelencia en la atención
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Brindamos servicios médicos de calidad, accesibles y oportunos,
                centrados en las necesidades del asegurado.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D9EBFF]">
              <Check className="w-5 h-5 text-[#1A73E8]" strokeWidth={3} />
            </span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Innovación al servicio de la salud
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Implementamos herramientas digitales como el chatbot
                institucional y plataformas virtuales para facilitar tus citas y
                consultas.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D9EBFF]">
              <Check className="w-5 h-5 text-[#1A73E8]" strokeWidth={3} />
            </span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Atención humana y cercana
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Promovemos un trato digno, empático y respetuoso en cada
                consulta y servicio que brindamos.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
