import { Stethoscope, ArrowLeft } from "lucide-react";

export const DoctorCards = ({
  doctors,
  onSelect,
}: {
  doctors: string[];
  onSelect: (value: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 mt-2">
      {doctors.map((doc, index) => {
        const clean = (doc ?? "").trim();
        const isBack = clean.toLowerCase().includes("volver");

        if (isBack) {
          return (
            <button
              key={`volver-${index}`}
              onClick={() => onSelect("volver")}
              className="
                flex items-center gap-3 px-4 py-3 rounded-xl
                bg-[#F7F8FC] shadow-sm border border-dashed border-[#245AB8]
                hover:bg-[#EEF3FF] transition-all duration-150
              "
            >
              <div
                className="w-8 h-8 rounded-full bg-[#245AB8]/10
                flex items-center justify-center text-[#245AB8]"
              >
                <ArrowLeft className="w-5 h-5" />
              </div>

              <span className="text-[13px] text-[#245AB8] font-medium">
                Volver a especialidades
              </span>
            </button>
          );
        }

        const numberValue = (index + 1).toString();

        return (
          <button
            key={`${clean}-${index}`}
            onClick={() => onSelect(numberValue)}
            className="
              flex items-center gap-3 px-4 py-3 rounded-xl
              bg-white shadow-sm border border-[#E4E8F6]
              hover:bg-[#F3F6FF] hover:border-[#245AB8]
              transition-all duration-150
            "
          >
            <div
              className="w-8 h-8 rounded-full bg-[#245AB8]/10 
              flex items-center justify-center text-[#245AB8]"
            >
              <Stethoscope className="w-5 h-5" />
            </div>

            <span className="text-[13px] text-[#1C274C] font-medium">
              {clean}
            </span>

            <div className="ml-auto w-7 h-7 rounded-lg bg-[#245AB8] text-white text-sm flex items-center justify-center font-bold">
              {numberValue}
            </div>
          </button>
        );
      })}
    </div>
  );
};
