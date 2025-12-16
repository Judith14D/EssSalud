import { CalendarCheck } from "lucide-react";
import noticia from "../../assets/images/Horarios.png";

export default function ScheduleSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={noticia}
            alt="Doctor EsSalud"
            className="w-[390px] rounded-2xl shadow-md object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Horarios de Atención
          </h2>

          <p className="text-sm text-gray-600 mb-10 max-w-md leading-relaxed">
            Atendemos a nuestros asegurados los siete días de la semana. Conoce
            los horarios disponibles para orientación, consultas y atención
            médica en los establecimientos de EsSalud.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
            {[
              { day: "Lunes", hours: "24 Horas" },
              { day: "Martes", hours: "24 Horas" },
              { day: "Miércoles", hours: "24 Horas" },
              { day: "Jueves", hours: "24 Horas" },
              { day: "Viernes", hours: "24 Horas" },
              { day: "Sábado y Domingo", hours: "24 Horas" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#8EC2FF] flex items-center justify-center mb-2">
                  <CalendarCheck className="text-white w-6 h-6" />
                </div>

                <h4 className="font-semibold text-[#1A1A1A]">{item.day}</h4>
                <p className="text-xs text-gray-600">{item.hours}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            El servicio de atención por emergencia y el chatbot Dialogix están
            disponibles las 24 horas del día. Para consultas médicas
            presenciales o ambulatorias, los horarios pueden variar según el
            hospital o policlínico de EsSalud al que perteneces.
          </p>

          <button className="bg-[#8EC2FF] hover:bg-[#7BB3F7] text-white px-6 py-3 rounded-lg text-sm font-medium shadow">
            Hablar con el Asesor Virtual
          </button>
        </div>
      </div>
    </section>
  );
}
