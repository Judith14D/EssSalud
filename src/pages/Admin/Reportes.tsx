import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Calendar,
  BarChart3,
  LineChart,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  reporteMetrica,
  reporteMetricaDia,
  reporteMetricaMes,
} from "../../service/api";
import type { MetricaItem } from "../../service/api";
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { BarChart as RBarChart, Bar } from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reportes() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [totalUso, setTotalUso] = useState(0);
  const [usoPorDia, setUsoPorDia] = useState<MetricaItem[]>([]);
  const [usoPorMes, setUsoPorMes] = useState<MetricaItem[]>([]);
  const [loading, setLoading] = useState(false);

  function formatearMesDesdeNumero(numMes: number) {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "setiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    if (numMes < 1 || numMes > 12) return "";

    return `${meses[numMes - 1]} 2025`;
  }

  function exportarExcel() {
    const hojaDia = XLSX.utils.json_to_sheet(usoPorDia);
    const hojaMes = XLSX.utils.json_to_sheet(usoPorMes);

    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hojaDia, "Por Día");
    XLSX.utils.book_append_sheet(libro, hojaMes, "Por Mes");

    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "reportes_dialogix.xlsx");
  }

  function exportarPDF() {
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text("Reporte de uso del sistema", 14, 15);

    pdf.setFontSize(12);
    pdf.text("Métricas por día", 14, 30);

    autoTable(pdf, {
      startY: 35,
      head: [["Fecha", "Total"]],
      body: usoPorDia.map((x) => [x.fecha, x.totalConversaciones]),
    });

    const finalY = (pdf as any).lastAutoTable.finalY + 15;

    pdf.text("Métricas por mes", 14, finalY);

    autoTable(pdf, {
      startY: finalY + 5,
      head: [["Mes", "Total"]],
      body: usoPorMes.map((x) => [x.fecha, x.totalConversaciones]),
    });

    pdf.save("reportes_dialogix.pdf");
  }

  function formatearFechaBonita(iso: string) {
    if (!iso) return "";
    const d = new Date(iso);
    const dia = d.getDate().toString().padStart(2, "0");
    const mes = (d.getMonth() + 1).toString().padStart(2, "0");
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  function formatearMes(fechaISO: string) {
    if (!fechaISO || typeof fechaISO !== "string") return "";

    const soloFecha = fechaISO.split("T")[0];
    const partes = soloFecha.split("-");

    if (partes.length < 2) return "";

    const [year, month] = partes;

    const meses = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];

    const idx = Number(month) - 1;
    if (idx < 0 || idx > 11) return "";

    return `${meses[idx]} ${year}`;
  }

  const consultar = async () => {
    if (!fechaInicio || !fechaFin) return alert("Selecciona ambas fechas");

    if (new Date(fechaFin) < new Date(fechaInicio))
      return alert("La fecha fin no puede ser menor que la fecha inicio");

    try {
      setLoading(true);

      const fi = fechaInicio;
      const ff = fechaFin;

      const resTotal = await reporteMetrica(fi, ff);
      setTotalUso(resTotal.objetoRespuesta || 0);

      const resDia = await reporteMetricaDia(fi, ff);
      console.log("DIA → ", resDia.objetoRespuesta);

      setUsoPorDia(
        (resDia.objetoRespuesta || []).map((x: any) => ({
          fecha: formatearFechaBonita(x.fecha || x.Fecha),
          totalConversaciones: Number(
            x.totalConversaciones || x.TotalConversaciones || 0
          ),
        }))
      );

      const resMes = await reporteMetricaMes(fi, ff);
      console.log("MES OBJETO → ", resMes.objetoRespuesta);

      setUsoPorMes(
        (resMes.objetoRespuesta || []).map((x: any) => {
          console.log("MES RAW → ", x.numeroMes, x.totalConversaciones);

          return {
            fecha: formatearMesDesdeNumero(Number(x.numeroMes)),
            totalConversaciones: Number(
              x.totalConversaciones || x.TotalConversaciones || 0
            ),
          };
        })
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AdminLayout>
      <div className="p-1 w-full">
        <h1 className="text-3xl font-bold text-[#0A4C78] mb-6">
          Reportes del Sistema
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow mb-8 border">
          <h2 className="text-lg font-semibold text-[#0A4C78] mb-4 flex items-center gap-2">
            <Calendar size={20} /> Filtros de búsqueda
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">Fecha Inicio</label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-lg border bg-gray-50"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Fecha Fin</label>
              <input
                type="date"
                className="w-full mt-1 p-2 rounded-lg border bg-gray-50"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                className="bg-[#0A4C78] w-full text-white py-2 rounded-lg hover:bg-[#083d63]"
                onClick={consultar}
              >
                {loading ? "Consultando..." : "Consultar"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-sm text-gray-500">Consultas Totales</h3>
            <p className="text-3xl font-bold text-[#0A4C78]">{totalUso}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-sm text-gray-500">Métricas por Día</h3>
            <p className="text-2xl font-bold text-[#0A4C78]">
              {usoPorDia.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-sm text-gray-500">Métricas por Mes</h3>
            <p className="text-2xl font-bold text-[#0A4C78]">
              {usoPorMes.length}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-lg font-semibold text-[#0A4C78] mb-4 flex items-center gap-2">
          <LineChart size={20} /> Métricas por Día
        </h3>

        {usoPorDia.length === 0 ? (
          <p className="text-gray-500">No hay datos para mostrar.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <RLineChart key={usoPorDia.length} data={usoPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" stroke="#0A4C78" type="category" />
              <YAxis stroke="#0A4C78" />
              <Tooltip
                formatter={(value) => [`${value} conversacion(es)`, "Total"]}
                labelFormatter={(label) => `Fecha: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalConversaciones"
                name="Total de conversaciones"
                stroke="#0A4C78"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </RLineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-10 bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-lg font-semibold text-[#0A4C78] mb-4 flex items-center gap-2">
          <BarChart3 size={20} /> Métricas por Mes
        </h3>

        {usoPorMes.length === 0 ? (
          <p className="text-gray-500">No hay datos para mostrar.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <RBarChart data={usoPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" stroke="#0A4C78" />
              <YAxis stroke="#0A4C78" />
              <Tooltip
                formatter={(value) => [`${value} conversacion(es)`, "Total"]}
                labelFormatter={(label) => `Mes: ${label}`}
              />
              <Legend />

              <Bar
                dataKey="totalConversaciones"
                name="Total de conversaciones"
                fill="#0A4C78"
                radius={[5, 5, 0, 0]}
              />
            </RBarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={exportarExcel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg
    bg-[#2E7D32] text-white font-medium shadow-md
    hover:bg-[#1B5E20] hover:shadow-lg
    transition-all duration-200"
        >
          <FileSpreadsheet size={20} strokeWidth={2} />
          Excel
        </button>

        <button
          onClick={exportarPDF}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg
    bg-[#B71C1C] text-white font-medium shadow-md
    hover:bg-[#7F0000] hover:shadow-lg
    transition-all duration-200"
        >
          <FileText size={20} strokeWidth={2} />
          PDF
        </button>
      </div>
    </AdminLayout>
  );
}
