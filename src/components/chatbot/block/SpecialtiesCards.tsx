import React from "react";
import {
  HeartPulse,
  Baby,
  Stethoscope,
  Sparkles,
  Flower,
  ScanFace,
  Activity,
} from "lucide-react";

const specialtyIcons: Record<string, React.ReactElement> = {
  cardiología: <HeartPulse className="w-6 h-6 text-[#245AB8]" />,

  dermatología: <ScanFace className="w-6 h-6 text-[#245AB8]" />,

  emergencias: <Activity className="w-6 h-6 text-[#245AB8]" />,

  ginecología: <Flower className="w-6 h-6 text-[#245AB8]" />,

  "Medicina General": <Stethoscope className="w-6 h-6 text-[#245AB8]" />,

  odontología: <Sparkles className="w-6 h-6 text-[#245AB8]" />,

  pediatría: <Baby className="w-6 h-6 text-[#245AB8]" />,
};

export const SpecialtiesCards = ({
  specialties,
  onSelect,
}: {
  specialties: string[];
  onSelect: (spec: string) => void;
}) => {
  const mapToNumber = (index: number) => String(index + 1);

  return (
    <div className="grid grid-cols-1 gap-3 mt-2">
      {specialties.map((name, index) => {
        const icon = specialtyIcons[name.toLowerCase()] ?? (
          <Activity className="w-6 h-6 text-[#245AB8]" />
        );

        const numberToSend = mapToNumber(index);

        return (
          <button
            key={name}
            onClick={() => onSelect(numberToSend)}
            className="
              flex items-center gap-3 px-4 py-3 rounded-xl
              bg-white shadow-sm border border-[#E4E8F6]
              hover:bg-[#F3F6FF] hover:border-[#245AB8]
              transition-all duration-150
            "
          >
            {icon}

            <span className="text-[13px] text-[#1C274C] font-medium">
              {name}
            </span>

            <div
              className="
                ml-auto w-7 h-7 rounded-lg bg-[#245AB8] text-white 
                text-sm flex items-center justify-center font-bold
              "
            >
              {numberToSend}
            </div>
          </button>
        );
      })}
    </div>
  );
};
