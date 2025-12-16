export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-[#F9FAFC]">
      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A1A] mb-16">
          ¿Cómo funciona EsSalud Virtual?
        </h2>

        <svg
          className="hidden md:block absolute left-[24%] top-[185px] w-40"
          viewBox="0 0 200 60"
          fill="none"
        >
          <path
            d="M0 30 C50 0, 150 60, 200 30"
            stroke="#67AAE6"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M200 30 L190 25 M200 30 L190 35"
            stroke="#67AAE6"
            strokeWidth="3"
          />
        </svg>

        <svg
          className="hidden md:block absolute right-[24%] top-[185px] w-40"
          viewBox="0 0 200 60"
          fill="none"
        >
          <path
            d="M0 30 C50 0, 150 60, 200 30"
            stroke="#67AAE6"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M200 30 L190 25 M200 30 L190 35"
            stroke="#67AAE6"
            strokeWidth="3"
          />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#8EC2FF] flex items-center justify-center text-2xl font-bold text-white">
              01
            </div>

            <h3 className="text-lg font-semibold text-[#1A1A1A]">Registro</h3>

            <p className="text-sm text-[#4B4B4B] max-w-xs">
              Antes de acceder a los servicios, es necesario registrarse con tu
              número de DNI o código de asegurado en la plataforma.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#8EC2FF] flex items-center justify-center text-2xl font-bold text-white">
              02
            </div>

            <h3 className="text-lg font-semibold text-[#1A1A1A]">
              Solicita tu cita
            </h3>

            <p className="text-sm text-[#4B4B4B] max-w-xs">
              Una vez registrado, puedes programar una cita médica desde el
              portal web o el chatbot institucional de manera rápida y segura.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#8EC2FF] flex items-center justify-center text-2xl font-bold text-white">
              03
            </div>

            <h3 className="text-lg font-semibold text-[#1A1A1A]">
              Atención médica
            </h3>

            <p className="text-sm text-[#4B4B4B] max-w-xs">
              Acude a tu cita en el centro asistencial correspondiente o recibe
              orientación médica virtual con nuestros profesionales de salud.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
