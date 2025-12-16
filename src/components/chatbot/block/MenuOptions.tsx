export const MenuOptions = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (option: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 mt-2">
      {options.map((label, index) => {
        const num = (index + 1).toString();

        return (
          <button
            key={num}
            onClick={() => onSelect(num)}
            className="
              flex items-center justify-between
              px-4 py-3 rounded-xl
              bg-white shadow-sm border border-[#E4E8F6]
              hover:bg-[#F3F6FF] hover:border-[#245AB8]
              transition-all duration-150 text-left
            "
          >
            <span className="text-[13px] text-[#1C274C] font-medium">
              {label}
            </span>

            <div className="w-8 h-8 rounded-lg bg-[#245AB8] text-white flex items-center justify-center text-sm font-bold">
              {num}
            </div>
          </button>
        );
      })}
    </div>
  );
};
