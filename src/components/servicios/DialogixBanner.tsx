import doctorImage from "../../assets/images/doctora01.png";
import { useChat } from "../../context/ChatContext";

export default function DialogixBanner() {
  const { setOpenChat } = useChat();
  return (
    <section className="w-full py-24 relative">
      <div
        className="
          max-w-7xl mx-auto px-10
          bg-[#7BB3F7]
          rounded-2xl
          relative
          overflow-visible
          py-12
          flex flex-col md:flex-row
          items-center
          justify-between
        "
      >
        <div className="flex-1 z-10 pl-10 md:pl-16 max-w-xl md:max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-white leading-tight mb-8">
            Recibe orientación médica <br />
            las 24 horas con Dialogix, <br />
            el chatbot oficial de EsSalud
          </h2>

          <button
            onClick={() => setOpenChat(true)}
            className="
              bg-white text-[#1A73E8] 
              px-6 py-2.5 
              rounded-md 
              text-base font-medium 
              shadow 
              hover:bg-[#F3F8FF] 
              transition
            "
          >
            Iniciar Chat
          </button>
        </div>

        <div>
          <img
            src={doctorImage}
            alt="Doctora EsSalud"
            className="
              w-64 lg:w-[480px]
              object-contain
              absolute 
              bottom-0 
              right-0
            "
          />
        </div>
      </div>
    </section>
  );
}
