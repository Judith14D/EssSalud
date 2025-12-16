import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  reporteMetricaDia,
  metricasHoy,
  totalCitas,
  totalCitasAtendidas,
  citasPorEspecialidadTotales,
} from "../../service/api";

export default function AdminHome() {
  const adminLS = localStorage.getItem("admin");

  const [admin] = useState(() => {
    if (!adminLS) return { nombreCompleto: "", rol: "" };

    const user = JSON.parse(adminLS);
    return {
      nombreCompleto: `${user.nombre} ${user.apellido}`,
      rol: user.rol || "Administrador",
    };
  });

  const [totalHoy, setTotalHoy] = useState<number | null>(null);
  const [totalCitasAgendadas, setTotalCitasAgendadas] = useState<number | null>(
    null
  );
  const [totalCitasAtendidasValue, setTotalCitasAtendidasValue] = useState<
    number | null
  >(null);

  const [data, setData] = useState<any[]>([]);
  const [especialidadesData, setEspecialidadesData] = useState<any[]>([]);

  const cargarEspecialidades = async () => {
    try {
      const res = await citasPorEspecialidadTotales();

      const formateado = res.objetoRespuesta
        .sort((a: any, b: any) => b.cantidad - a.cantidad)
        .map((item: any) => ({
          name: item.especilidad,
          value: item.cantidad,
        }));

      setEspecialidadesData(formateado);
    } catch (error) {
      console.error("Error cargando especialidades:", error);
    }
  };

  const today = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cargarDashboard = async () => {
    try {
      const hoy = new Date().toISOString().split("T")[0];
      const hace7 = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const [resHoy, resCitas, resAtendidas, resDia] = await Promise.all([
        metricasHoy(),
        totalCitas(),
        totalCitasAtendidas(),
        reporteMetricaDia(hace7, hoy),
      ]);

      setTotalHoy(Number(resHoy?.objetoRespuesta) || 0);
      setTotalCitasAgendadas(Number(resCitas?.objetoRespuesta) || 0);
      setTotalCitasAtendidasValue(Number(resAtendidas?.objetoRespuesta) || 0);

      setData(
        (resDia?.objetoRespuesta || []).map((x: any) => ({
          day: new Date(x.fecha || x.Fecha).toLocaleDateString("es-PE", {
            weekday: "long",
          }),
          count: Number(x.totalConversaciones) || 0,
        }))
      );
    } catch (error) {
      console.error("Error cargando dashboard", error);

      setTotalHoy(0);
      setTotalCitasAgendadas(0);
      setTotalCitasAtendidasValue(0);
    }
  };

  const handleRefresh = () => {
    cargarDashboard();
    cargarEspecialidades();
  };

  useEffect(() => {
    cargarDashboard();
    cargarEspecialidades();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full">
        <div
          className="
          flex flex-col md:flex-row 
          md:items-center md:justify-between 
          mb-10
        "
        >
          <div>
            <h1 className="text-3xl font-semibold text-[#0A4C78]">
              Bienvenido, {admin.nombreCompleto || "Administrador"}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="px-3 py-1 text-xs rounded-full bg-[#E8F4FF] text-[#0A4C78] font-medium">
                {admin.nombreCompleto} · {admin.rol}
              </span>

              <span className="text-gray-500 text-xs">{today}</span>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="
            mt-4 md:mt-0
            flex items-center gap-2
            bg-[#0A4C78] text-white 
            px-4 py-2 rounded-lg 
            text-sm shadow-sm
            border border-transparent
            hover:bg-[#083d63] hover:shadow-md
            transition-all cursor-pointer
          "
          >
            <RefreshCw size={16} />
            Actualizar Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-100">
          <div>
            <p className="text-gray-500 text-sm mb-1">
              Consultas del Chatbot Hoy
            </p>
            <h2 className="text-3xl font-bold text-[#0A4C78]">
              {totalHoy ?? 0}{" "}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Consultas atendidas por Dialogix
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <div className="bg-[#E8F4FF] p-3 rounded-full">
              <svg
                className="w-6 h-6 text-[#0A4C78]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M7 16h10a2 2 0 0 0 2-2V7a2 
              2 0 0 0-2-2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-100">
          <div>
            <p className="text-gray-500 text-sm mb-1">Citas Agendadas</p>
            <h2 className="text-3xl font-bold text-[#0A4C78]">
              {totalCitasAgendadas ?? 0}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Citas generadas por el sistema
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <div className="bg-[#E8F4FF] p-3 rounded-full">
              <svg
                className="w-6 h-6 text-[#0A4C78]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-100">
          <div>
            <p className="text-gray-500 text-sm mb-1">Citas Atendidas</p>
            <h2 className="text-3xl font-bold text-[#0A4C78]">
              {totalCitasAtendidasValue ?? 0}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Total de citas atendidas por médicos
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <div className="bg-[#E8F4FF] p-3 rounded-full">
              <svg
                className="w-6 h-6 text-[#0A4C78]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6a4 4 0 0 1 4 4v2H8v-2a4 4 0 0 1 4-4Zm6 6v4H6v-4M9 20h6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-100">
          <div>
            <p className="text-gray-500 text-sm mb-1">Usuarios Activos</p>
            <h2 className="text-3xl font-bold text-[#0A4C78]">1</h2>
            <p className="text-xs text-gray-400 mt-1">
              Pacientes activos en la plataforma
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <div className="bg-[#E8F4FF] p-3 rounded-full">
              <svg
                className="w-6 h-6 text-[#0A4C78]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M15 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#0A4C78]">
            Actividad del Chatbot (últimos 7 días)
          </h2>
          <p className="text-gray-500 text-sm mt-1 md:mt-0">
            Total de mensajes recibidos por Dialogix
          </p>
        </div>

        <div className="w-full h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
              <Tooltip
                cursor={{ stroke: "#A5D9F3" }}
                formatter={(value: any) => [`${value}`, "Conversaciones"]}
                labelFormatter={(label) => `Día: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#0A4C78"
                strokeWidth={3}
                dot={{ r: 4, fill: "#0A4C78" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#0A4C78] mb-4">
          Citas Totales Agendadas por Especialidad
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={especialidadesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} citas`, "Total"]}
                labelFormatter={(label) => `Especialidad: ${label}`}
              />
              <Bar dataKey="value" fill="#0A4C78" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
