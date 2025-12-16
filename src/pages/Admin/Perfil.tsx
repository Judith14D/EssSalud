import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Save,
  UserCircle,
  Upload,
  CalendarClock,
  CheckCircle,
} from "lucide-react";
import {
  subirAvatar,
  actualizarDatosUsuario,
  listarActividadesRecientes,
} from "../../service/api";

export default function PerfilAdmin() {
  const [admin, setAdmin] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    rol: "",
    ultimoAcceso: "",
  });

  const [foto, setFoto] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [actividades, setActividades] = useState<any[]>([]);
  const cargarActividades = async () => {
    try {
      const res = await listarActividadesRecientes(10);

      const formateadas = (res.objetoRespuesta || []).map((a: any) => ({
        fecha: a.fecha,
        actividad: a.accion,
        admin: a.adminNombre,
      }));

      setActividades(formateadas);
    } catch (error) {
      console.error("Error cargando actividades", error);
      setActividades([]);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("admin");
    if (data) {
      const user = JSON.parse(data);

      setUserId(user.idUsuario);
      setAdmin({
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.user,
        rol: user.rol,
        ultimoAcceso: new Date().toLocaleString("es-PE", { hour12: true }),
      });

      if (user.avatar) setFoto(user.avatar);
    }
  }, []);

  const handleFoto = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFoto(URL.createObjectURL(file));

    const user = JSON.parse(localStorage.getItem("usuario")!);

    try {
      const resp = await subirAvatar(user.idUsuario, file);

      user.avatar = resp.objetoRespuesta.avatar;
      localStorage.setItem("usuario", JSON.stringify(user));
      window.dispatchEvent(new Event("usuarioActualizado"));

      showToast("Foto de perfil actualizada.", "success");

      cargarActividades();
    } catch {
      showToast("Error al subir foto.", "info");
    }
  };

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const guardarCambios = async () => {
    if (!userId) return;

    const response = await actualizarDatosUsuario(
      userId,
      admin.nombre,
      admin.apellido
    );

    if (response.estado) {
      localStorage.setItem("usuario", JSON.stringify(response.objetoRespuesta));
      window.dispatchEvent(new Event("usuarioActualizado"));

      showToast("Datos actualizados correctamente", "success");

      cargarActividades();
    } else {
      showToast(response.mensaje, "info");
    }
  };

  return (
    <AdminLayout>
      {toast.visible && (
        <div
          className={`
            fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg 
            flex items-center gap-3 text-white text-sm
            animate-slide-up z-[999]
            ${toast.type === "success" ? "bg-green-600" : "bg-[#0A4C78]"}
          `}
        >
          <CheckCircle size={20} />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#0A4C78] mb-1">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-[#0A4C78] mb-4">
            Foto de Perfil
          </h2>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 ring-4 ring-[#0A4C78]/20">
              {foto ? (
                <img src={foto} className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-full h-full text-gray-400 p-4" />
              )}
            </div>

            <label className="cursor-pointer bg-[#0A4C78] text-white px-4 py-2 rounded-lg shadow hover:bg-[#083d63] flex items-center gap-2">
              <Upload size={18} />
              Cambiar foto
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFoto}
              />
            </label>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-[#0A4C78] mb-6">
            Información Personal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                value={admin.nombre}
                onChange={(e) => setAdmin({ ...admin, nombre: e.target.value })}
                className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">
                Apellido
              </label>
              <input
                type="text"
                value={admin.apellido}
                onChange={(e) =>
                  setAdmin({ ...admin, apellido: e.target.value })
                }
                className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium">Rol</label>
              <input
                type="text"
                readOnly
                value={admin.rol}
                className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                Último acceso
                <CalendarClock size={16} className="text-[#0A4C78]" />
              </label>
              <input
                type="text"
                readOnly
                value={admin.ultimoAcceso}
                className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={guardarCambios}
            className="mt-8 flex gap-2 items-center bg-[#0A4C78] text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-[#083d63]"
          >
            <Save size={18} /> Guardar Cambios
          </button>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-[#0A4C78] mb-4">
          Mis Actividades Recientes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#EAF4FF] text-[#0A4C78]">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold border-b">
                  Fecha
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold border-b">
                  Actividad
                </th>
              </tr>
            </thead>

            <tbody>
              {actividades.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No hay actividades registradas
                  </td>
                </tr>
              ) : (
                actividades.map((item, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-2 px-4 text-sm text-gray-700 border-b">
                      {new Date(item.fecha).toLocaleString("es-PE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700 border-b">
                      {item.actividad}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
