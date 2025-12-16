import { Link, useParams } from "react-router-dom";
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

export default function NewsDetailPage() {
  const { id } = useParams();

  const news = [
    {
      id: 0,
      image: salud01,
      title: "Hospital Perú brindó más de 120 000 atenciones en 2025",
      date: "Viernes · 14 de noviembre del 2025",
      text: "El nosocomio itinerante de EsSalud atendió 122,325 atenciones a nivel nacional durante 2025.",
      content: `
Durante el 2025, el Hospital Perú —la unidad itinerante de EsSalud— realizó 122,325 atenciones médicas en diversas regiones del país.  
Las brigadas se desplazaron a comunidades de difícil acceso, brindando consultas especializadas, diagnósticos, cirugías menores, vacunación y atención preventiva.

El objetivo del Hospital Perú es acercar servicios de salud a poblaciones alejadas o con limitada infraestructura sanitaria. Profesionales de múltiples especialidades participaron en estas campañas, incluyendo medicina interna, pediatría, oftalmología, ginecología y odontología.

Estas intervenciones continuarán en 2026, priorizando zonas rurales, frontera y comunidades vulnerables.
`,
    },

    {
      id: 1,
      image: salud11,
      title:
        "EsSalud invertirá S/ 20.3 millones en equipos para el primer nivel de atención en 2025",
      date: "Jueves · 13 de noviembre del 2025",
      text: "Se adquirirá equipamiento biomédico para fortalecer centros de salud primarios.",
      content: `
EsSalud anunció una inversión de S/ 20.3 millones destinada al fortalecimiento del primer nivel de atención.  
La adquisición incluye 3,570 equipos biomédicos como tensiómetros, ecógrafos portátiles, balanzas pediátricas, lámparas de exploración y mobiliario médico.

El primer nivel es clave para la prevención y diagnóstico temprano, por lo que esta medida buscar mejorar la capacidad de respuesta de policlínicos y postas en regiones.
`,
    },
    {
      id: 2,
      image: salud02,

      title:
        "EsSalud destina S/ 600 millones para renovación de equipamiento médico en 2025",
      date: "Miércoles · 12 de noviembre del 2025",
      text: "La inversión permitirá mejorar la capacidad diagnóstica y terapéutica en hospitales nacionales.",
      content: `
La institución anunció una inversión histórica de S/ 600 millones para renovar equipamiento médico en hospitales de todo el país.  
El plan incluye resonadores magnéticos, tomógrafos, angiógrafos, mamógrafos digitales, equipos de rayos X y monitores multiparámetro.

La modernización fortalecerá el diagnóstico oportuno, reducirá tiempos de espera y permitirá ampliar servicios complejos como oncología y cardiovascular.
`,
    },

    {
      id: 3,
      image: salud03,
      title:
        "EsSalud anuncia inversión millonaria para modernizar infraestructura hospitalaria en 2025",
      date: "Martes · 11 de noviembre del 2025",
      text: "El plan incluye construcción y renovación de hospitales y compra de ambulancias.",
      content: `
EsSalud presentó un plan nacional de modernización de infraestructura equivalente a más de S/ 2,800 millones.  
Entre los proyectos destacan nuevos hospitales, ampliación de emergencias, áreas críticas y adquisición de ambulancias equipadas.

La iniciativa busca atender la creciente demanda y mejorar la calidad de los servicios a nivel nacional.
`,
    },

    {
      id: 4,
      image: salud04,
      title:
        "Campaña del Hospital Perú llega a Arequipa con más de 5 000 atenciones especializadas",
      date: "Lunes · 10 de noviembre del 2025",
      text: "La brigada itinerante realizó campañas especializadas en Mollendo y Yanahuara.",
      content: `
El Hospital Perú llegó a Arequipa, ofreciendo más de 5,000 atenciones especializadas en Mollendo y Yanahuara.  
Se realizaron intervenciones oftalmológicas (incluyendo cirugías de cataratas), ecografías, consultas médicas, entrega de medicamentos y despistajes preventivos.

Estas campañas continúan extendiéndose a otras provincias del sur peruano.
`,
    },

    {
      id: 5,
      image: salud05,
      title:
        "EsSalud invertirá más de S/ 45 millones en equipamiento para lucha contra el cáncer en 2025",
      date: "Domingo · 9 de noviembre del 2025",
      text: "La institución renovará equipos oncológicos de diagnóstico y tratamiento.",
      content: `
Con el objetivo de fortalecer la detección y tratamiento del cáncer, EsSalud destinará más de S/ 45 millones en equipamiento especializado.  
Entre las adquisiciones figuran resonadores magnéticos, cámaras gamma, mamógrafos digitales y equipos de medicina nuclear.

El proyecto prioriza hospitales nacionales y regionales con alta demanda oncológica.
`,
    },

    {
      id: 6,
      image: salud06,
      title:
        "EsSalud retira dispositivos Essure tras recomendación internacional",
      date: "Sábado · 8 de noviembre del 2025",
      text: "La institución acató alertas internacionales sobre el dispositivo anticonceptivo.",
      content: `
EsSalud retiró de sus establecimientos el método anticonceptivo Essure tras alertas de organismos internacionales que recomendaban su suspensión.  
El retiro se realizó de forma preventiva, y se orientó a las pacientes que previamente lo habían utilizado.

La institución reafirmó su compromiso con la seguridad y vigilancia de dispositivos médicos.
`,
    },

    {
      id: 7,
      image: salud07,
      title: "EsSalud entrega nuevas ambulancias para fortalecer emergencias",
      date: "Viernes · 7 de noviembre del 2025",
      text: "Se incorporaron modernas unidades equipadas para atención prehospitalaria.",
      content: `
EsSalud entregó una nueva flota de ambulancias totalmente equipadas para reforzar la atención prehospitalaria y el traslado de pacientes.  
Las unidades incluyen monitor multiparámetro, desfibrilador, ventilador mecánico portátil y sistema de oxigenoterapia.

Las ambulancias serán distribuidas en redes asistenciales de alta demanda.
`,
    },

    {
      id: 8,
      image: salud08,
      title: "EsSalud supera los 2 millones de atenciones por telemedicina",
      date: "Jueves · 6 de noviembre del 2025",
      text: "El servicio digital continúa expandiéndose.",
      content: `
El servicio de telemedicina de EsSalud superó los 2 millones de atenciones, consolidándose como uno de los programas digitales más importantes del país.  
Las consultas incluyen medicina general, nutrición, psicología, control de enfermedades crónicas y seguimiento de tratamientos.

La plataforma seguirá integrando nuevas especialidades durante 2026.
`,
    },

    {
      id: 9,
      image: salud09,
      title: "EsSalud reporta récord de trasplantes realizados durante el 2024",
      date: "Miércoles · 5 de noviembre del 2025",
      text: "Incremento de donaciones permitió más procedimientos.",
      content: `
Durante el 2024 se alcanzó un récord nacional de trasplantes realizados en EsSalud, gracias al incremento significativo en la donación de órganos.  
Se efectuaron trasplantes renales, hepáticos y de córnea en diversas redes asistenciales.

Los especialistas destacaron la importancia de continuar promoviendo la donación voluntaria.
`,
    },

    {
      id: 10,
      image: salud10,
      title:
        "EsSalud moderniza servicios materno-infantiles en diversas regiones",
      date: "Martes · 4 de noviembre del 2025",
      text: "Se renovaron áreas especializadas para atención de gestantes y recién nacidos.",
      content: `
EsSalud inauguró renovadas áreas materno-infantiles en varias regiones del país.  
Las mejoras incluyen salas de parto, cuidados inmediatos del recién nacido, neonatología, consultorios obstétricos y equipos de monitoreo fetal.

El objetivo es asegurar una atención más segura y oportuna para madres y bebés.
`,
    },

    {
      id: 11,
      image: salud11,
      title:
        "EsSalud implementa medidas para reducir colas y mejorar asignación de citas",
      date: "Lunes · 3 de noviembre del 2025",
      text: "Se optimizaron canales virtuales y presenciales.",
      content: `
EsSalud anunció medidas para reducir las colas y agilizar la asignación de citas médicas.  
Entre las acciones se encuentran mejoras en la plataforma digital, ampliación de horarios y nuevos módulos de atención presencial.

Las medidas buscan reducir tiempos de espera y mejorar la experiencia del usuario asegurado.
`,
    },
  ];

  const post = news.find((n) => n.id === Number(id));

  if (!post)
    return <div className="p-20 text-center">Noticia no encontrada</div>;

  return (
    <>
      <section className="w-full bg-[#EFF3F8] py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-md m-11">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            {post.title}
          </h1>

          <p className="text-gray-500 text-sm mt-1 mb-6">{post.date}</p>

          <div className="w-full h-80 rounded-xl mb-10 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <article className="text-gray-700 leading-relaxed whitespace-pre-line text-base mb-12">
            {post.content}
          </article>

          <Link
            to="/news"
            className="
            inline-block
            bg-[#1A73E8]
            text-white
            px-6 py-2.5
            rounded-md
            font-medium
            shadow-sm
            hover:bg-[#1666d3]
            transition
          "
          >
            Regresar
          </Link>
        </div>
      </section>
      <FloatingButtons />
      <ChatDialogix />
    </>
  );
}
