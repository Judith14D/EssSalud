import { Phone, MessageCircle, Mail, Clock } from "lucide-react";

export const AsesorCard = ({ data }: { data: any }) => {
  return (
    <div className="w-full max-w-[260px] bg-white border border-[#E6ECFF] rounded-xl p-3 text-[12.5px] text-[#1C274C] shadow-sm space-y-2.5">
      <div className="font-semibold text-[#2F5BEA] text-[13px]">
        Canales oficiales de atención
      </div>

      <div className="flex items-center gap-2">
        <Phone size={14} className="text-[#2F5BEA]" />
        <span className="font-medium">Teléfono:</span>
        <span>{data.Telefono}</span>
      </div>

      <div className="flex items-center gap-2">
        <MessageCircle size={14} className="text-[#2F5BEA]" />
        <span className="font-medium">WhatsApp:</span>
        <span>{data.WhatsApp}</span>
      </div>

      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-[#2F5BEA]" />
          <span className="font-medium">Correo:</span>
        </div>
        <div className="pl-6 text-[11px] break-all text-[#3A4A6A]">
          {data.Correo}
        </div>
      </div>

      <div className="flex items-start gap-2 pt-1 border-t border-[#EEF2FF]">
        <Clock size={26} className="text-[#2F5BEA] mt-[2px]" />
        <span className="font-medium">Horario:</span>
        <span>{data.Horario}</span>
      </div>
    </div>
  );
};
