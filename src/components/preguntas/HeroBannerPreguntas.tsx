import { Search } from "lucide-react";

interface HeroBannerProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function HeroBannerPreguntas({
  search,
  setSearch,
}: HeroBannerProps) {
  return (
    <section
      className="
        w-full 
        min-h-[320px] 
        flex flex-col 
        items-center 
        justify-center 
        text-center 
        bg-gradient-to-r from-[#95A6FF] to-[#7DD5FF] 
        pt-32 pb-20
        text-white
      "
    >
      <h1 className="text-4xl font-bold tracking-wide drop-shadow-sm">
        Preguntas Frecuentes
      </h1>

      <p className="mt-3 text-sm md:text-base text-white/90">
        Tu centro de ayuda está aquí para orientarte
      </p>

      <div className="mt-8 flex items-center w-full max-w-lg bg-white rounded-full shadow-md px-4 py-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="flex-1 px-3 py-2 text-gray-700 text-sm outline-none rounded-full"
        />

        <button
          className="
            w-10 h-10 
            flex items-center justify-center 
            bg-[#95A6FF] 
            hover:bg-[#8898f8]
            text-white 
            rounded-full 
            transition
          "
        >
          <Search size={18} />
        </button>
      </div>
    </section>
  );
}
