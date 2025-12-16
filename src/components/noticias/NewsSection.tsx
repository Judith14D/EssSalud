import { Link, useParams } from "react-router-dom";

export default function NewsSection() {
  const bigPost = {
    id: 0,
    image: "buscar: EsSalud atención en centro laboral 2025",
    title:
      "EsSalud acerca sus servicios a centros laborales: más de 100 000 atenciones en 2025",
    text: "Entre enero y setiembre de 2025, la estrategia Prevenir EsSalud brindó 100 030 atenciones en 89 empresas de todo el país, llevando controles preventivos, despistajes y orientación médica a trabajadores.",
  };

  const newsPosts = [
    {
      id: 1,
      image: "buscar: EsSalud inversión equipos primer nivel 2025",
      title:
        "EsSalud invertirá más de S/ 20 millones en equipamiento para el primer nivel de atención",
      text: "En octubre de 2025 se aprobó una inversión para mejorar equipamiento en centros de salud primarios, reforzando la atención básica.",
    },
    {
      id: 2,
      image: "buscar: EsSalud red asistencial 2025",
      title:
        "EsSalud refuerza su red asistencial para mejorar cobertura médica",
      text: "La institución anunció medidas para mejorar infraestructura, contratación y servicios en IPRESS y hospitales del país.",
    },
    {
      id: 3,
      image: "buscar: Hospital Rebagliati remodelación 2025",
      title:
        "Hospital Rebagliati cumple años y renueva sus servicios e infraestructura",
      text: "El hospital realiza mejoras en emergencias, imagenología y atención especializada.",
    },
    {
      id: 4,
      image: "buscar: EsSalud sala quirúrgica Almenara 2025",
      title:
        "EsSalud pone en funcionamiento moderna sala quirúrgica en Hospital Almenara",
      text: "La nueva sala incrementará la capacidad quirúrgica mensual y mejorará la seguridad de las operaciones.",
    },
    {
      id: 5,
      image: "buscar: EsSalud operativo salud rural 2025",
      title:
        "EsSalud intensifica operativos de salud integral en zonas rurales y periféricas",
      text: "Campañas territoriales acercan atención médica y despistajes a población vulnerable.",
    },
    {
      id: 6,
      image: "buscar: EsSalud reprograma citas 2025 paro",
      title:
        "EsSalud habilita reprogramación de citas ante paro de transportistas",
      text: "Se flexibilizó la reprogramación de citas para no afectar a los asegurados durante el paro.",
    },
    {
      id: 7,
      image: "buscar: EsSalud atención primaria 2025",
      title:
        "EsSalud anuncia mejoras en atención primaria y servicios de emergencia",
      text: "El plan incluye refuerzos en centros de salud, ambulancias y servicios básicos.",
    },
    {
      id: 8,
      image: "buscar: EsSalud nuevo equipamiento biomédico 2025",
      title:
        "EsSalud renueva su equipamiento biomédico para mejorar diagnóstico y tratamiento",
      text: "Se adquirió equipamiento moderno para optimizar la atención en hospitales.",
    },
    {
      id: 9,
      image: "buscar: EsSalud salud ocupacional 2025",
      title:
        "EsSalud amplía cobertura preventiva en salud ocupacional para trabajadores",
      text: "Jornadas de despistaje, chequeos y promoción de salud se ofrecen a trabajadores asegurados.",
    },
    {
      id: 10,
      image: "buscar: EsSalud infraestructura hospitalaria 2025",
      title:
        "EsSalud aprueba nuevos proyectos de infraestructura hospitalaria para 2026",
      text: "Licencias de obras permitirán ampliar hospitales y mejorar servicios en regiones.",
    },
    {
      id: 11,
      image: "buscar: EsSalud cobertura médica 2025",
      title: "EsSalud refuerza su red para ampliar cobertura médica en 2025",
      text: "Acciones institucionales buscan mejorar accesibilidad para asegurados.",
    },
  ];

  const params = useParams();
  const id = params.id ? Number(params.id) : null;

  if (id !== null) {
    const post = id === 0 ? bigPost : newsPosts.find((p) => p.id === id);
    if (!post) {
      return <div className="p-20 text-center">Noticia no encontrada</div>;
    }

    return (
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Link
          to="/news"
          className="inline-flex items-center text-[#1A73E8] text-sm mb-6 hover:underline"
        >
          ← Volver a noticias
        </Link>

        <div className="w-full h-80 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-sm text-gray-600 font-medium">
          {post.image}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 mb-8">Actualizado · 2025</p>

        <article className="text-base text-gray-700 leading-relaxed space-y-4 mb-14">
          <p>{post.text}</p>
          <p>
            Estas acciones forman parte del plan institucional de EsSalud para
            mejorar la accesibilidad, reforzar la atención preventiva y
            optimizar los servicios de salud en todo el país durante el año
            2025.
          </p>
          <p>
            La institución continuará implementando mejoras, reforzando la
            atención primaria, equipamiento biomédico y operativos territoriales
            para garantizar un servicio oportuno y de calidad a los asegurados.
          </p>
        </article>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-14">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Información oficial
          </h3>
          <p className="text-sm text-blue-900">
            Esta noticia está basada en comunicados públicos de EsSalud y medios
            oficiales como gob.pe, TVPerú, El Comercio y la web institucional de
            EsSalud.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Noticias relacionadas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {newsPosts
            .filter((n) => n.id !== id)
            .slice(0, 4)
            .map((n) => (
              <Link
                key={n.id}
                to={`/news/${n.id}`}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition block"
              >
                <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-xs mb-3">
                  {n.image}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {n.title}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {n.text.substring(0, 80)}...
                </p>
              </Link>
            ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <Link
        to={`/news/${bigPost.id}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
      >
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-xs">
          {bigPost.image}
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
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-xs mb-4">
              {post.image}
            </div>
            <h4 className="font-semibold text-sm">{post.title}</h4>
            <p className="text-gray-600 text-xs">{post.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
