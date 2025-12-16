import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Save,
  RefreshCcw,
  CheckCircle,
  RotateCcw,
  X,
  Trash2,
  Edit,
} from "lucide-react";
import {
  listarPreguntas,
  registrarPregunta,
  actualizarPregunta,
  eliminarPregunta,
  obtenerConfiguracionChatbot,
  actualizarConfiguracionChatbot,
} from "../../service/api";

export default function ConfigChatbot() {
  const [bienvenida, setBienvenida] = useState(
    "Hola 👋 Soy Dialogix, tu asistente virtual. ¿En qué puedo ayudarte hoy?"
  );

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [inicio, setInicio] = useState("00:00");
  const [fin, setFin] = useState("23:59");
  const [fueraHorario, setFueraHorario] = useState(true);
  const [maxMensajes, setMaxMensajes] = useState(15);
  const [timeout, setTimeoutValue] = useState(30);
  const [activo, setActivo] = useState(true);
  const [estado, setEstado] = useState("ACT");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ visible: true, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleRestaurar = async () => {
    try {
      const res = await obtenerConfiguracionChatbot();
      const c = res.objetoRespuesta;

      setBienvenida(c.mensajeBienvenida);
      setInicio(c.horaInicio.slice(0, 5));
      setFin(c.horaFin.slice(0, 5));
      setFueraHorario(c.habilitarFueraHorario);
      setMaxMensajes(c.maxMensajes);
      setTimeoutValue(c.timeoutSegundos);
      setActivo(c.activo);

      showToast("Configuración restaurada desde el sistema", "info");
    } catch {
      showToast("Error al restaurar configuración", "info");
    }
  };

  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const [descripcion, setDescripcion] = useState("");
  const [orden, setOrden] = useState("");

  const cargarPreguntas = async () => {
    try {
      const res = await listarPreguntas();
      setPreguntas(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const res = await obtenerConfiguracionChatbot();
        const c = res.objetoRespuesta;

        setBienvenida(c.mensajeBienvenida);
        setInicio(c.horaInicio.slice(0, 5));
        setFin(c.horaFin.slice(0, 5));
        setFueraHorario(c.habilitarFueraHorario);
        setMaxMensajes(c.maxMensajes);
        setTimeoutValue(c.timeoutSegundos);
        setActivo(c.activo);
      } catch (error) {
        console.error(error);
        showToast("Error al cargar configuración", "info");
      }
    };

    cargarConfiguracion();
  }, []);

  const handleGuardar = async () => {
    try {
      await actualizarConfiguracionChatbot({
        idConfig: 1,
        mensajeBienvenida: bienvenida,
        mensajeFueraHorario:
          "Nuestro horario de atención ha finalizado. Puede intentarlo más tarde.",
        mensajeMantenimiento:
          "El chatbot se encuentra en mantenimiento. Inténtelo más tarde.",
        horaInicio: inicio + ":00",
        horaFin: fin + ":00",
        habilitarFueraHorario: fueraHorario,
        maxMensajes,
        timeoutSegundos: timeout,
        activo,
        fechaActualizacion: new Date().toISOString(),
      });

      showToast("Configuración guardada correctamente");
    } catch (error) {
      console.error(error);
      showToast("Error al guardar configuración", "info");
    }
  };

  const guardarPregunta = async () => {
    if (!descripcion.trim()) return showToast("La descripción es obligatoria");

    if (!orden) return showToast("El orden es obligatorio");

    try {
      if (editing) {
        await actualizarPregunta(
          editing.idPreguntaFrecuente,
          descripcion,
          estado,
          Number(orden)
        );

        showToast("Pregunta actualizada correctamente");
      } else {
        await registrarPregunta(descripcion, "ACT", Number(orden));
        showToast("Pregunta registrada correctamente");
      }

      setModalOpen(false);
      setDescripcion("");
      setOrden("");
      setEditing(null);
      cargarPreguntas();
    } catch (err) {
      console.error(err);
      showToast("Error en la operación", "info");
    }
  };

  const eliminarPreguntaFunc = async (id: number) => {
    if (!confirm("¿Eliminar esta pregunta frecuente?")) return;

    try {
      await eliminarPregunta(id);
      showToast("Pregunta eliminada");
      cargarPreguntas();
    } catch {
      showToast("Error al eliminar", "info");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full relative">
        <div>
          <h2 className="text-2xl font-bold text-[#0A4C78]">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-600 text-sm mb-6 mt-2">
            Administra las preguntas que el chatbot puede responder rápidamente.
          </p>

          <button
            onClick={() => {
              setEditing(null);
              setDescripcion("");
              setOrden("");
              setModalOpen(true);
            }}
            className="mb-4 bg-[#0A4C78] text-white px-4 py-2 rounded-xl shadow hover:bg-[#083d63]"
          >
            + Nueva Pregunta
          </button>

          <div className="bg-white rounded-xl shadow border overflow-hidden mb-10">
            <table className="w-full text-left">
              <thead className="bg-[#0A4C78] text-white">
                <tr>
                  <th className="p-3 text-sm font-medium">Orden</th>
                  <th className="p-3 text-sm font-medium">Descripción</th>
                  <th className="p-3 text-sm font-medium text-right">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {preguntas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No hay preguntas registradas
                    </td>
                  </tr>
                ) : (
                  preguntas.map((p) => (
                    <tr
                      key={p.idPreguntaFrecuente}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{p.orden}</td>
                      <td className="p-3">{p.descripcion}</td>
                      <td className="p-3 text-right flex items-center justify-end gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition"
                          onClick={() => {
                            setEditing(p);
                            setDescripcion(p.descripcion);
                            setOrden(String(p.orden));
                            setEstado(p.estado);
                            setModalOpen(true);
                          }}
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          className="text-red-500 hover:text-red-700 transition"
                          onClick={() => {
                            setDeleteId(p.idPreguntaFrecuente);
                            setDeleteModal(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {toast.visible && (
          <div
            className={`
              fixed bottom-6 right-6 px-6 py-3 rounded-2xl shadow-xl
              flex items-center gap-3 border border-white/20
              text-white text-sm backdrop-blur-md animate-slide-up
              ${
                toast.type === "success" ? "bg-green-600/90" : "bg-[#0A4C78]/90"
              }
            `}
          >
            {toast.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <RotateCcw size={20} />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#0A4C78] tracking-tight">
            Configurar Chatbot
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Ajusta el comportamiento general de Dialogix.
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleGuardar}
            className="
              flex items-center gap-2 bg-[#0A4C78] text-white
              px-5 py-2.5 rounded-xl shadow-md
              hover:bg-[#083d63] hover:shadow-lg
              transition-all duration-200
            "
          >
            <Save size={18} /> Guardar Cambios
          </button>

          <button
            onClick={handleRestaurar}
            className="
              flex items-center gap-2 bg-gray-200 text-gray-700
              px-5 py-2.5 rounded-xl shadow
              hover:bg-gray-300 hover:shadow-md
              transition-all duration-200
            "
          >
            <RefreshCcw size={18} /> Restaurar
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white/90 p-7 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold text-[#0A4C78] mb-2">
              Mensaje de Bienvenida
            </h2>

            <textarea
              value={bienvenida}
              onChange={(e) => setBienvenida(e.target.value)}
              className="
                w-full h-28 p-3 rounded-xl text-sm
                bg-gray-50 border border-gray-200
                focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30
                outline-none transition-all
              "
            />
            <div className="mt-3 bg-gray-50 border border-dashed border-[#0A4C78]/40 rounded-xl p-4 text-sm">
              <p className="text-xs text-gray-500 mb-1">
                Vista previa del chatbot
              </p>

              <div className="bg-white rounded-lg px-4 py-3 shadow-sm border">
                {bienvenida || "Mensaje de bienvenida"}
              </div>
            </div>
          </div>

          <div className="bg-white/90 p-7 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold text-[#0A4C78] mb-4">
              Horario de Atención
            </h2>

            <label className="text-sm text-gray-600">Hora Inicio</label>
            <input
              type="time"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="
                w-full p-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30
                outline-none
              "
            />

            <label className="text-sm text-gray-600 mt-3">Hora Fin</label>
            <input
              type="time"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="
                w-full p-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30
                outline-none
              "
            />

            <label className="flex items-center gap-3 mt-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={fueraHorario}
                onChange={() => setFueraHorario(!fueraHorario)}
                className="accent-[#0A4C78]"
              />
              Habilitar mensajes fuera de horario
            </label>
          </div>

          <div className="bg-white/90 p-7 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold text-[#0A4C78] mb-4">
              Límites del Chatbot
            </h2>

            <label className="text-sm text-gray-600">Máx. mensajes</label>
            <input
              type="number"
              value={maxMensajes}
              onChange={(e) => setMaxMensajes(Number(e.target.value))}
              className="
                w-full p-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30
              "
            />

            <label className="text-sm text-gray-600 mt-3">
              Tiempo límite por consulta (segundos)
            </label>
            <input
              type="number"
              value={timeout}
              onChange={(e) => setTimeoutValue(Number(e.target.value))}
              className="
                w-full p-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30
              "
            />
          </div>

          <div className="bg-white/90 p-7 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold text-[#0A4C78] mb-4">
              Estado del Chatbot
            </h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setActivo(!activo)}
                className={`
                  w-14 h-7 rounded-full relative transition-all duration-300
                  ${activo ? "bg-green-500" : "bg-gray-400"}
                `}
              >
                <div
                  className={`
                    w-6 h-6 bg-white rounded-full absolute top-0.5 shadow-md transition-all duration-300
                    ${activo ? "left-7" : "left-1"}
                  `}
                ></div>
              </div>
              <span className="text-gray-700 text-sm">
                {activo ? "Chatbot Activo" : "En mantenimiento"}
              </span>
            </label>
          </div>
        </div>

        {modalOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="bg-white p-8 rounded-xl shadow-xl w-[430px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>

              <h2 className="text-xl font-semibold text-[#0A4C78]">
                {editing ? "Editar Pregunta" : "Nueva Pregunta"}
              </h2>

              <label className="text-sm text-gray-700 mt-4 block">
                Descripción
              </label>
              <input
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full mt-1 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30 outline-none"
              />

              <label className="text-sm text-gray-700 mt-4 block">Orden</label>
              <input
                type="number"
                min={1}
                value={orden}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setOrden(v < 1 ? "1" : String(v));
                }}
                className="
      w-full bg-gray-50 px-3 py-2 rounded-xl
      border border-gray-300
      focus:border-[#0A4C78] focus:ring-2 focus:ring-[#0A4C78]/30
      outline-none transition-all
      [appearance:textfield]
    "
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={guardarPregunta}
                  className="px-4 py-2 bg-[#0A4C78] text-white rounded-lg hover:bg-[#083d63]"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
        {deleteModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
            onClick={() => setDeleteModal(false)}
          >
            <div
              className="
        bg-white p-8 rounded-2xl shadow-2xl w-[480px] 
        relative border border-gray-200
        animate-[fadeIn_.25s_ease-out]
        scale-100
      "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                onClick={() => setDeleteModal(false)}
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <Trash2 className="text-red-600" size={28} />
                </div>

                <h2 className="text-xl font-semibold text-[#0A4C78]">
                  Confirmar Eliminación
                </h2>

                <p className="text-gray-600 text-[15px] mt-2 leading-relaxed max-w-[360px]">
                  ¿Seguro que deseas eliminar esta pregunta? Esta acción no se
                  puede deshacer.
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>

                <button
                  onClick={async () => {
                    if (!deleteId) return;

                    try {
                      await eliminarPregunta(deleteId);
                      showToast("Pregunta eliminada correctamente");
                      cargarPreguntas();
                    } catch {
                      showToast("Error al eliminar", "info");
                    }

                    setDeleteId(null);
                    setDeleteModal(false);
                  }}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
