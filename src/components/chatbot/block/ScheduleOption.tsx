import { Clock3, ArrowLeft } from "lucide-react";

export const ScheduleOption = ({
  hour,
  index,
  onSelect,
}: {
  hour: string;
  index: number;
  onSelect: (value: string) => void;
}) => {
  const clean = (hour ?? "").trim();
  const isBack = clean.toLowerCase().includes("volver");

  if (isBack) {
    return (
      <button
        onClick={() => onSelect("volver")}
        className="
          w-full bg-[#F7F8FC] rounded-xl shadow-sm
          border border-dashed border-[#245AB8]
          hover:bg-[#EEF3FF]
          transition-all duration-150 px-4 py-3
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded-full bg-[#245AB8]/10
            flex items-center justify-center text-[#245AB8]"
          >
            <ArrowLeft className="w-5 h-5" />
          </div>

          <span className="text-[13px] font-medium text-[#245AB8]">
            Volver a doctores
          </span>
        </div>
      </button>
    );
  }

  const value = (index + 1).toString();

  return (
    <button
      onClick={() => onSelect(value)}
      className="
        w-full bg-white rounded-xl shadow-sm border border-[#E4E8F6]
        hover:bg-[#F3F6FF] hover:border-[#245AB8]
        transition-all duration-150 px-4 py-3
      "
    >
      <div className="grid grid-cols-[28px_1fr_32px] items-center gap-4">
        <span className="text-[#245AB8] flex items-center justify-center">
          <Clock3 className="w-5 h-5" />
        </span>

        <div className="flex flex-col text-left">
          <span className="text-[14px] font-semibold text-[#1C274C]">
            {clean}
          </span>
        </div>

        <div className="w-8 h-8 rounded-lg bg-[#245AB8] text-white flex items-center justify-center text-sm font-bold">
          {value}
        </div>
      </div>
    </button>
  );
};
