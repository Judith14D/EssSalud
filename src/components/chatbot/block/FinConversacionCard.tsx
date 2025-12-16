export const FinConversacionCard = ({
  text,
  onSelect,
}: {
  text: string;
  finalizar: string;
  menu: string;
  onSelect: (v: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <p className="text-[13px] text-[#1C274C] leading-relaxed">{text}</p>
      <button
        className="
    w-full py-3 rounded-2xl font-semibold text-[14px]
    bg-white text-[#C62828]
    shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.8)]
    border border-[#eef2ff]
    active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
    transition-all
  "
        onClick={() => onSelect("finalizar")}
      >
        Finalizar
      </button>
      <button
        className="
    w-full py-3 rounded-2xl font-semibold text-[14px]
    bg-white text-[#245AB8]
    shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.8)]
    border border-[#eef2ff]
    active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]
    transition-all
  "
        onClick={() => onSelect("menu")}
      >
        Volver al menú
      </button>
    </div>
  );
};
