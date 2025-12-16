import { useChat } from "../../context/ChatContext";
import botImg from "../../assets/images/Bot.png";
import whatsappImg from "../../assets/images/logoWsp.png";

export default function FloatingButtons() {
  const { openChat, setOpenChat } = useChat();

  return (
    <>
      <a
        href="#"
        className="
          fixed bottom-6 left-6 z-50
          w-31 h-31 rounded-full bg-[#47C756]
          flex items-center justify-center shadow-lg
          hover:scale-110 transition-all cursor-pointer
        "
      >
        <img
          src={whatsappImg}
          alt="WhatsApp"
          className="w-28 h-28 object-contain"
        />
      </a>

      <div
        className="
          fixed bottom-6 right-6 z-50
          flex flex-col items-end gap-2
        "
      >
        {!openChat && (
          <div
            className="
              bg-white px-4 py-2 rounded-xl shadow-lg text-sm text-gray-700
              border border-gray-100 animate-fade-in
            "
          >
            <p className="font-semibold text-gray-800">Estamos en línea</p>
            <p>¿En qué puedo ayudarte hoy?</p>
          </div>
        )}

        {!openChat && (
          <button
            onClick={() => setOpenChat(true)}
            className="
              w-32 h-32 rounded-full bg-white shadow-lg
              flex items-center justify-center
              hover:scale-110 transition-all cursor-pointer
            "
          >
            <img src={botImg} alt="Chatbot" className="w-28 h-28" />
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
