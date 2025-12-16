import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";

type Slide = {
  title: string;
  text: string;
};

const slides: Slide[] = [
  {
    title: "Comprometidos con tu salud",
    text: "Brindamos servicios médicos esenciales para los asegurados en todo el país, con profesionales dedicados y un enfoque en la mejora continua de la atención.",
  },
  {
    title: "Facilidad para gestionar tus citas",
    text: "Solicita y revisa tus citas médicas mediante nuestros canales digitales, diseñados para ayudarte a evitar desplazamientos y optimizar tu tiempo.",
  },
  {
    title: "Información disponible cuando la necesitas",
    text: "Accede a tus datos, servicios y trámites en línea de manera sencilla desde cualquier dispositivo, para que tengas el control de tu atención en todo momento.",
  },
];

export const HeroCarousel: React.FC = () => {
  const { setOpenChat } = useChat();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[580px] items-center justify-center bg-gradient-to-r from-[#95A6FF] to-[#7DD5FF] pt-32 pb-20 text-white"
    >
      <button
        onClick={goPrev}
        aria-label="Slide anterior"
        className="absolute left-8 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center 
        rounded-full border border-white/70 bg-white/10 hover:bg-white/20 
        transition-all cursor-pointer z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="relative w-full overflow-hidden px-6">
        <div
          className="flex w-full transition-transform duration-700 ease-out transform-gpu"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full min-w-full flex-shrink-0 flex flex-col items-center text-center px-4"
            >
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>

              <p className="max-w-3xl text-base md:text-lg leading-snug tracking-tight mb-10">
                {slide.text}
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setOpenChat(true)}
                  className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white shadow-md hover:bg-black/90 transition-colors cursor-pointer"
                >
                  Solicitar Cita
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("servicios")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full border border-white bg-white px-7 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Ver Servicios
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-3">
          {slides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setIndex(dotIndex)}
              className={`h-3 w-3 rounded-full transition-all cursor-pointer ${
                dotIndex === index
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={goNext}
        aria-label="Siguiente slide"
        className="absolute right-8 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center 
        rounded-full border border-white/70 bg-white/10 hover:bg-white/20 
        transition-all cursor-pointer z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};
