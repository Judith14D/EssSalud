import { Link } from "react-router-dom";
import HeroBannerNoticias from "../../components/noticias/HeroBannerNoticias";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";
import salud01 from "../../assets/images/noticias/salud01.jpg";
import salud02 from "../../assets/images/noticias/salud02.jpg";
import salud03 from "../../assets/images/noticias/salud03.jpg";
import salud04 from "../../assets/images/noticias/salud04.jpg";
import salud05 from "../../assets/images/noticias/salud05.jpg";
import salud06 from "../../assets/images/noticias/salud06.jpg";
import salud07 from "../../assets/images/noticias/salud07.jpg";
import salud08 from "../../assets/images/noticias/salud08.jpg";
import salud09 from "../../assets/images/noticias/salud09.jpg";
import salud10 from "../../assets/images/noticias/salud10.jpg";
import salud11 from "../../assets/images/noticias/salud11.jpg";

export default function NewsListPage() {
  const bigPost = {
    id: 0,
    image: salud01,
    title: "Hospital Perú brindó más de 120 000 atenciones en 2025",
    text: "El nosocomio itinerante de EsSalud atendió 122,325 atenciones a nivel nacional durante 2025, en diferentes regiones, como parte de su estrategia de acercar servicios a poblaciones con difícil acceso.",
  };

  const newsPosts = [
    {
      id: 1,
      image: salud11,
      title:
        "EsSalud invertirá S/ 20.3 millones en equipos para el primer nivel de atención en 2025",
      text: "La institución adquirirá 3,570 equipos biomédicos, mobiliario y equipamiento complementario para fortalecer centros de salud primarios en todo el país.",
    },
    {
      id: 2,
      image: salud02,

      title:
        "EsSalud destina S/ 600 millones para renovación de equipamiento médico en 2025",
      text: "La inversión incluye resonadores magnéticos, tomógrafos, angiógrafos, mamógrafos, entre otros equipos de alta tecnología, para mejorar la capacidad diagnóstica y terapéutica en hospitales públicos.",
    },
    {
      id: 3,
      image: salud03,
      title:
        "EsSalud anuncia inversión millonaria para modernizar infraestructura hospitalaria en 2025",
      text: "El plan contempla la construcción y mejora de hospitales, compra de ambulancias y nuevos equipos médicos para ampliar la capacidad de atención.",
    },
    {
      id: 4,
      image: salud04,
      title:
        "Campaña del Hospital Perú llega a Arequipa con más de 5 000 atenciones especializadas",
      text: "La brigada itinerante de EsSalud desplegó servicios médicos especializados, incluyendo cirugías oftalmológicas de cataratas, en Mollendo y Yanahuara (Arequipa) durante 2025}",
    },
    {
      id: 5,
      image: salud05,
      title:
        "EsSalud invertirá más de S/ 45 millones en equipamiento para lucha contra el cáncer en 2025",
      text: "La institución anunció la compra de equipos de diagnóstico y tratamiento oncológico, como resonadores magnéticos, cámaras gamma y mamógrafos digitales.",
    },
    {
      id: 6,
      image: salud06,
      title:
        "EsSalud retira dispositivos Essure tras recomendación internacional",
      text: "La institución retiró el anticonceptivo Essure de sus establecimientos siguiendo alertas sanitarias internacionales.",
    },
    {
      id: 7,
      image: salud07,
      title: "EsSalud entrega nuevas ambulancias para fortalecer emergencias",
      text: "Se incorporaron modernas ambulancias equipadas para mejorar la atención prehospitalaria.",
    },
    {
      id: 8,
      image: salud08,
      title: "EsSalud supera los 2 millones de atenciones por telemedicina",
      text: "El servicio digital continúa ampliando cobertura y permitiendo consultas sin desplazamientos.",
    },
    {
      id: 9,
      image: salud09,
      title: "EsSalud reporta récord de trasplantes realizados durante el 2024",
      text: "El incremento de donaciones permitió más procedimientos de riñón, hígado y córnea.",
    },
    {
      id: 10,
      image: salud10,
      title:
        "EsSalud moderniza servicios materno-infantiles en diversas regiones",
      text: "Se inauguraron áreas renovadas para asegurar atención oportuna y segura a gestantes y recién nacidos.",
    },
    {
      id: 11,
      image: salud11,
      title:
        "EsSalud implementa medidas para reducir colas y mejorar asignación de citas",
      text: "Se optimizaron canales virtuales y presenciales para agilizar reservas y reprogramaciones.",
    },
  ];

  return (
    <>
      <HeroBannerNoticias />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <Link
          to={`/news/${bigPost.id}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
        >
          <div className="w-full h-64">
            <img
              src={bigPost.image}
              alt={bigPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4">{bigPost.title}</h3>
            <p className="text-gray-600 text-sm">{bigPost.text}</p>
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsPosts.map((post) => (
            <Link
              key={post.id}
              to={`/news/${post.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <div className="w-full h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-sm">{post.title}</h4>
              <p className="text-gray-600 text-xs">{post.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <FloatingButtons />
      <ChatDialogix />
    </>
  );
}
