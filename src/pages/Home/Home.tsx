import { HeroCarousel } from "../../components/Home/HeroCarousel";
import { Servicios } from "../../components/Home/Servicios";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";
import elegirnosImg from "../../assets/images/doctor.jpg";
import covidImg from "../../assets/images/info.jpg";
import noticiaPrincipalImg from "../../assets/images/NoticiaPrincipal.png";
import noticia01 from "../../assets/images/noticia01.png";
import noticia02 from "../../assets/images/noticia02.png";
import noticia03 from "../../assets/images/noticia03.png";
import botImg from "../../assets/images/Bot.png";

import { RocketIcon, HeartIcon, UsersIcon } from "lucide-react";

const Home: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <main>
          <HeroCarousel />
          <section className="w-full bg-[#F9FAFC] py-20 px-6">
            <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ¿Por qué elegirnos?
                </h2>

                <p className="text-sm text-gray-600 max-w-md mb-10">
                  En EsSalud trabajamos para brindar servicios de salud
                  esenciales a nuestros asegurados en todo el país. Estas son
                  algunas razones que respaldan nuestro trabajo diario:
                </p>

                <div className="flex items-start gap-4 mb-10">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#667CF1] text-white">
                    <RocketIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Profesionales con trayectoria
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      Contamos con especialistas y personal médico con amplia
                      experiencia en el sector público, dedicados a brindar una
                      atención responsable y acorde a las necesidades del
                      paciente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-10">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#667CF1] text-white">
                    <HeartIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Atención orientada a tus necesidades
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      Nos esforzamos por brindar un trato respetuoso y claro,
                      priorizando la información oportuna y el acompañamiento
                      durante tus consultas y procedimientos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#667CF1] text-white">
                    <UsersIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Un sistema al servicio del país
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      Formamos parte de la red de salud pública que atiende a
                      millones de peruanos. Nuestro compromiso es seguir
                      mejorando los servicios y responder a las necesidades de
                      la población asegurada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src={elegirnosImg}
                  alt="Doctor EsSalud"
                  className="w-[590px] h-auto object-contain"
                />
              </div>
            </div>
          </section>
          <section className="w-full bg-white py-20 px-6">
            <div className="mx-auto max-w-6xl grid md:grid-cols-[2fr_1fr] gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#245AB8] mb-4">
                  Gestión de citas y consultas más sencilla
                </h2>

                <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                  Nuestro asistente virtual te ayuda a resolver dudas y realizar
                  consultas de manera rápida desde cualquier dispositivo, puedes
                  acceder a información sobre tus citas, servicios disponibles,
                  horarios de atención y orientación sobre trámites, sin
                  necesidad de acudir presencialmente. Es una herramienta
                  diseñada para facilitar tu experiencia y brindarte respuestas
                  claras en pocos pasos.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center relative">
                <img
                  src={botImg}
                  alt="Bot EsSalud"
                  className="w-[130px] h-auto object-contain relative z-10"
                />

                <div className="mt-[10px] w-[100px] h-[35px] bg-[#c0c4c7] rounded-full blur-md opacity-70"></div>
              </div>
            </div>
          </section>

          <div id="servicios">
            <Servicios />
          </div>

          <section className="w-full py-20 px-6 bg-white">
            <div className="mx-auto max-w-5xl">
              <img
                src={covidImg}
                alt="COVID EsSalud"
                className="w-full rounded-xl shadow-md"
              />
            </div>
          </section>
          <section className="w-full bg-white py-20 px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold text-[#245AB8] mb-10">
                Noticias
              </h2>

              <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 mb-14 min-h-[260px]">
                <img
                  src={noticiaPrincipalImg}
                  alt="Noticias"
                  className="w-full h-[260px] rounded-lg object-cover"
                />

                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-900 leading-snug mb-4">
                    Capacitación en primeros auxilios para personal asistencial
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    Con el objetivo de fortalecer la respuesta ante emergencias,
                    se desarrolló una jornada de capacitación en primeros
                    auxilios para enfermeras, técnicos y personal
                    administrativo. El entrenamiento incluyó manejo de vía
                    aérea, soporte básico de vida y protocolos de atención
                    inmediata.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                <div>
                  <img
                    src={noticia01}
                    alt="Noticias"
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <h4 className="font-semibold mt-3">
                    Capacitación en primeros auxilios para personal asistencial
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Con el objetivo de fortalecer la respuesta ante emergencias,
                    se desarrolló una jornada de capacitación en primeros
                    auxilios para enfermeras, técnicos y personal
                    administrativo. El entrenamiento incluyó manejo de vía
                    aérea, soporte básico de vida y protocolos de atención
                    inmediata.
                  </p>
                </div>

                <div>
                  <img
                    src={noticia02}
                    alt="Noticias"
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <h4 className="font-semibold mt-3">
                    Modernización del área de insumos médicos y esterilización
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    EsSalud anunció la implementación de nuevos equipos para el
                    manejo y esterilización de insumos médicos. Estas mejoras
                    permiten optimizar los procesos de cuidado, garantizar una
                    mayor seguridad para los pacientes y reducir los tiempos de
                    preparación de materiales.
                  </p>
                </div>

                <div>
                  <img
                    src={noticia03}
                    alt="Noticias"
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <h4 className="font-semibold mt-3">
                    Especialistas realizan actualización en diagnóstico por
                    imágenes
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Un equipo de radiólogos participó en una sesión de
                    actualización sobre nuevas técnicas de interpretación de
                    tomografías y resonancias. La capacitación busca mejorar la
                    precisión diagnóstica y fortalecer la atención en los
                    servicios de imagenología del seguro social.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <FloatingButtons />
          <ChatDialogix />
        </main>
      </div>
    </>
  );
};

export default Home;
