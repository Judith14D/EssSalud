export default function HeroBannerNoticias() {
  return (
    <section
      className="
        w-full 
        min-h-[280px] 
        flex flex-col 
        items-center 
        justify-center 
        text-center 
        bg-gradient-to-r from-[#95A6FF] to-[#7DD5FF] 
        pt-32 pb-16
        text-white
      "
    >
      <h1 className="text-4xl font-bold tracking-wide drop-shadow-sm">
        Nuestros Servicios
      </h1>

      <p className="mt-3 text-sm md:text-base text-white/90">
        Conoce las noticias más recientes sobre salud, prevención y bienestar
      </p>
    </section>
  );
}
