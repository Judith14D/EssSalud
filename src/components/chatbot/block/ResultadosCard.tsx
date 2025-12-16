export const ResultadosCard = ({ data }: { data: any[] }) => {
  const badgeColor = (estado: string) => {
    const e = estado.toLowerCase();

    if (e.includes("validado"))
      return "bg-blue-100 text-blue-700 border-blue-300";

    if (e.includes("registrado"))
      return "bg-yellow-100 text-yellow-700 border-yellow-300";

    if (e.includes("observado"))
      return "bg-orange-100 text-orange-700 border-orange-300";

    if (e.includes("normal"))
      return "bg-green-100 text-green-700 border-green-300";

    if (e.includes("alto") || e.includes("elevado"))
      return "bg-red-100 text-red-700 border-red-300";

    if (e.includes("bajo") || e.includes("baja"))
      return "bg-purple-100 text-purple-700 border-purple-300";

    return "bg-gray-100 text-gray-600 border-gray-300";
  };

  return (
    <div className="bg-white border border-[#E3EBFF] shadow-sm rounded-xl p-4 text-[#1C274C] w-full">
      <h3 className="font-semibold text-[14px] mb-3">
        Últimos resultados médicos
      </h3>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-[#F8FAFF] border border-[#E3EBFF] rounded-lg p-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold">{item.examen}</span>

              <span
                className={`text-[11px] px-2 py-1 m-2 rounded-md border ${badgeColor(
                  item.estado
                )}`}
              >
                {item.estado}
              </span>
            </div>

            <div className="text-[12px] text-[#5F6B93] mt-1">
              Fecha del examen: {item.fecha}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-[#1C274C]">
        Solo se muestra el estado del resultado.
      </p>
    </div>
  );
};
