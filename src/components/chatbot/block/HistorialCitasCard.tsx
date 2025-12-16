export const HistorialCitasCard = ({ data }: { data: any[] }) => {
  const badgeColor = (estado?: string) => {
    if (!estado) return "bg-gray-100 text-gray-600 border-gray-300";

    const e = estado.toLowerCase();

    if (e.includes("programada"))
      return "bg-blue-100 text-blue-700 border-blue-300";

    if (e.includes("cancelada"))
      return "bg-red-100 text-red-700 border-red-300";

    if (e.includes("atendida"))
      return "bg-green-100 text-green-700 border-green-300";

    return "bg-gray-100 text-gray-600 border-gray-300";
  };

  return (
    <div className="bg-white border border-[#E3EBFF] shadow-sm rounded-xl p-4 text-[#1C274C] w-full">
      <h3 className="font-semibold text-[14px] mb-3">Últimas citas médicas</h3>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-[#F8FAFF] border border-[#E3EBFF] rounded-lg p-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold">
                {item.Especialidad}
              </span>

              <span
                className={`text-[11px] px-2 py-1 rounded-md border ${badgeColor(
                  item.Estado
                )}`}
              >
                {item.Estado}
              </span>
            </div>

            <div className="text-[12px] text-[#5F6B93] mt-1">
              Fecha: {item.Fecha}
            </div>

            <div className="text-[12px] text-[#5F6B93]">Hora: {item.Hora}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-[#1C274C]">
        Solo se muestran las citas más recientes.
      </p>
    </div>
  );
};
