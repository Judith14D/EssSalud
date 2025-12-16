import footerImg from "../../assets/images/logo footer.png";
import { Instagram, Youtube, Twitter, Mail, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F1426] text-white py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10 md:flex md:justify-between md:items-start">
          <div className="md:w-[35%]">
            <div className="flex items-center mb-4">
              <img src={footerImg} alt="logo" className="h-16 object-contain" />
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-[220px]">
              Brindamos atención médica integral, humana y de calidad para todos
              los asegurados.
            </p>

            <div className="flex gap-4 mt-4 text-white">
              <Instagram className="w-5 h-5 hover:text-blue-300 cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-blue-300 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-blue-300 cursor-pointer" />
              <Mail className="w-5 h-5 hover:text-blue-300 cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-blue-300 cursor-pointer" />
            </div>
          </div>

          <div className="md:w-[20%] space-y-2">
            <h4 className="font-semibold mb-3">Enlaces Rápidos</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">Inicio</li>
              <li className="hover:text-white cursor-pointer">Servicios</li>
              <li className="hover:text-white cursor-pointer">Noticias</li>
              <li className="hover:text-white cursor-pointer">Nosotros</li>
              <li className="hover:text-white cursor-pointer">
                Preguntas Frecuentes
              </li>
            </ul>
          </div>

          <div className="md:w-[20%]">
            <h4 className="font-semibold mb-3">Recursos</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">
                Guías de salud
              </li>
              <li className="hover:text-white cursor-pointer">
                Programas preventivos
              </li>
              <li className="hover:text-white cursor-pointer">
                Educación al paciente
              </li>
              <li className="hover:text-white cursor-pointer">
                Información de seguros
              </li>
              <li className="hover:text-white cursor-pointer">
                Portal de transparencia
              </li>
            </ul>
          </div>

          <div className="md:w-[25%]">
            <h4 className="font-semibold mb-3">Contáctanos</h4>

            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Llámanos al:
              <br />
              <span className="font-semibold text-white">
                (01) 265-6000 / 265-7000
              </span>
            </p>

            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Cita general al:
              <br />
              <span className="font-semibold text-white">(01) 411-8000</span>
            </p>

            <p className="text-sm text-gray-300 leading-relaxed">
              Visítanos en:
              <br />
              Jr. Domingo Cueto 120, Jesús María – Lima, Perú
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-600/40"></div>

        <p className="text-center text-xs text-gray-400 mt-4">
          ©2025 EsSalud todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
