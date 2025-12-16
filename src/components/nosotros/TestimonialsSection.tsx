export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-3">
          Porque los asegurados confían en nosotros
        </h2>

        <p className="text-center text-gray-500 text-sm mb-16">
          Lo que nuestros usuarios destacan sobre EsSalud
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Usuario"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm">Enrique Perez</h4>
                <p className="text-xs text-gray-500">
                  Asegurado, Red Prestacional Rebagliati
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              Cuidamos a cada persona de manera integral, promoviendo hábitos
              saludables y atención humana. Sentí el compromiso del personal por
              brindar un servicio eficiente.
            </p>
          </div>

          <div className="flex flex-col items-start border-l border-r border-gray-200 px-8">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://i.pravatar.cc/80?img=32"
                alt="Usuario"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm">Enrique Perez</h4>
                <p className="text-xs text-gray-500">Asegurado, Red Almenara</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              Gracias a EsSalud, mi familia y yo recibimos atención completa y
              oportuna. Siempre encontramos personal dispuesto a ayudarnos.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://i.pravatar.cc/80?img=45"
                alt="Usuario"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm">Enrique Perez</h4>
                <p className="text-xs text-gray-500">
                  Usuario del servicio digital EsSalud
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              El chatbot institucional me permitió programar mi cita sin salir
              de casa. Fue rápido y siempre me mantuvieron informada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
