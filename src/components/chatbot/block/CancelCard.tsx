export const CancelCard = ({
  data,
  onConfirm,
}: {
  data: any;
  onConfirm: (value: "1" | "0") => void;
}) => {
  return (
    <div className="bg-white border border-[#E3EBFF] shadow-sm rounded-xl p-4 text-[#1C274C] w-full">
      <h3 className="font-semibold text-[14px] mb-3">
        Cancelación de cita médica
      </h3>

      <div className="text-[12px] space-y-1">
        <div>• Paciente: {data.Paciente}</div>
        <div>• Doctor: {data.Doctor}</div>
        <div>• Motivo: {data.Motivo || "No especificado"}</div>
        <div>• Fecha: {data.Fecha}</div>
      </div>

      <p className="mt-4 text-[12px]">
        ¿Está seguro que desea cancelar su cita médica?
      </p>

      <p className="text-[11px] text-[#8A94B2] mt-1">
        Cancelar repetidamente puede restringir futuras citas virtuales.
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onConfirm("1")}
          className="flex-1 bg-[#245AB8] text-white py-2 rounded-lg text-[13px] font-medium hover:bg-[#1D4A96]"
        >
          Sí, cancelar
        </button>

        <button
          onClick={() => onConfirm("0")}
          className="flex-1 bg-[#F4F7FF] border border-[#DCE3F9] text-[#1C274C] py-2 rounded-lg text-[13px] hover:bg-[#E8EEFF]"
        >
          No, mantener
        </button>
      </div>
    </div>
  );
};
