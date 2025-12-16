export const MenuOptionsLimited = ({
  onSelect,
}: {
  onSelect: (option: string) => void;
}) => {
  const options = [
    { num: "5", label: "Conversar con la IA" },
    { num: "6", label: "Hablar con un asesor" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mt-2 w-full">
      {options.map((opt) => (
        <button
          key={opt.num}
          onClick={() => onSelect(opt.num)}
          className="
            flex items-center justify-between
            px-4 py-3 rounded-xl
            bg-white shadow-sm border border-[#E4E8F6]
            hover:bg-[#F3F6FF] hover:border-[#245AB8]
            transition-all duration-150 text-left
          "
        >
          <span className="text-[13px] text-[#1C274C] font-medium">
            {opt.label}
          </span>

          <div className="w-8 h-8 rounded-lg bg-[#245AB8] text-white flex items-center justify-center text-sm font-bold">
            {opt.num}
          </div>
        </button>
      ))}
    </div>
  );
};
