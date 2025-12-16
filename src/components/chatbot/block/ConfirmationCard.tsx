import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

export const ConfirmationCard = ({
  data,
  onSelect,
}: {
  data: any;
  onSelect: (value: string) => void;
}) => {
  return (
    <div className="bg-white border border-[#E3EBFF] shadow-sm rounded-xl p-4 text-[#1C274C] w-full">
      <h3 className="font-semibold text-[14px] mb-3">
        Confirmación de cita médica
      </h3>

      <div className="text-[12px] space-y-1">
        <div className="font-semibold text-[#102A6B]">Datos del paciente</div>
        <div>• {data.Paciente}</div>

        <div className="mt-3 font-semibold text-[#102A6B]">Información</div>
        <div>• Especialidad: {data.Especialidad}</div>
        <div>• Médico: {data.Medico}</div>
        <div>• Horario: {data.Horario}</div>
      </div>

      <p className="mt-4 text-[12px] font-medium">¿Desea confirmar la cita?</p>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={() => onSelect("1")}
          className="
            flex items-center justify-center gap-2 
            px-4 py-2 rounded-lg 
            bg-[#245AB8] text-white
            hover:bg-[#1D4A96] transition-all
            text-[13px] font-medium
          "
        >
          <CheckCircle className="w-4 h-4" />
          Sí
        </button>

        <button
          onClick={() => onSelect("2")}
          className="
            flex items-center justify-center gap-2 
            px-4 py-2 rounded-lg 
            bg-white text-[#1C274C] border border-[#E3EBFF]
            hover:bg-[#F3F6FF] transition-all
            text-[13px] font-medium
          "
        >
          <XCircle className="w-4 h-4 text-red-500" />
          No
        </button>
      </div>

      <button
        onClick={() => onSelect("volver")}
        className="
          mt-3 w-full flex items-center justify-center gap-2
          px-4 py-2 rounded-lg
          bg-[#F7F8FC] border border-dashed border-[#245AB8]
          text-[#245AB8]
          hover:bg-[#EEF3FF]
          transition-all text-[13px] font-medium
        "
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a horarios
      </button>
    </div>
  );
};
