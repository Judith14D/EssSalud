import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  UserCog,
  LogOut,
  MessageSquare,
  X,
} from "lucide-react";

export default function SidebarAdmin() {
  const location = useLocation();
  const [modalLogout, setModalLogout] = useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/admin/home", icon: <BarChart3 size={18} /> },
    {
      label: "Configurar Chatbot",
      path: "/admin/chatbot",
      icon: <MessageSquare size={18} />,
    },
    {
      label: "Generar Reportes",
      path: "/admin/reportes",
      icon: <FileText size={18} />,
    },
  ];

  const accountItems = [
    { label: "Perfil", path: "/admin/perfil", icon: <UserCog size={18} /> },
    {
      label: "Cerrar Sesión",
      action: () => setModalLogout(true),
      icon: <LogOut size={18} />,
    },
  ];

  const activeClass =
    "bg-[#E8F5FF] text-[#0A4C78] font-medium shadow-sm border-l-4 border-[#0A4C78]";

  const defaultClass =
    "text-gray-600 hover:bg-[#D7ECFA] hover:text-[#0A4C78] transition";

  return (
    <>
      <aside
        className="
    w-64 h-screen 
    bg-white border-r border-[#E2E8F0]
    flex flex-col
    fixed left-0 top-0
  "
      >
        <div className="px-6 py-6 border-b border-[#E2E8F0]">
          <h1 className="text-xl font-bold text-[#0A4C78]">EsSalud Admin</h1>
          <p className="text-xs text-gray-500 mt-1">Panel de Administración</p>
        </div>

        <nav className="p-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
            flex items-center gap-3 px-4 py-3 rounded-lg
            cursor-pointer
            ${isActive ? activeClass : defaultClass}
          `}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 mt-auto">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-2">
            Cuenta
          </p>

          {accountItems.map((item, index) =>
            item.path ? (
              <Link
                key={index}
                to={item.path}
                className="
            flex items-center gap-3 px-4 py-3 
            rounded-lg cursor-pointer 
            text-gray-600 hover:bg-[#D7ECFA] hover:text-[#0A4C78] transition
          "
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            ) : (
              <div
                key={index}
                onClick={item.action}
                className="
            flex items-center gap-3 px-4 py-3 
            rounded-lg cursor-pointer 
            text-gray-600 hover:bg-[#D7ECFA] hover:text-[#0A4C78] transition
          "
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            )
          )}
        </div>
      </aside>

      {modalLogout && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          onClick={() => setModalLogout(false)}
        >
          <div
            className="
              bg-white p-8 w-[430px]
              rounded-xl shadow-xl animate-fadeIn relative
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalLogout(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-semibold text-[#0A4C78]">
              ¿Cerrar sesión?
            </h2>

            <p className="text-gray-600 mt-2 text-sm">
              ¿Estás seguro de que deseas salir de tu cuenta?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalLogout(false)}
                className="
                  px-4 py-2 rounded-lg 
                  bg-gray-200 text-gray-700 
                  hover:bg-gray-300 transition
                "
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("admin");
                  localStorage.removeItem("usuario");
                  localStorage.removeItem("token");
                  window.location.href = "/admin/login";
                }}
                className="
                  px-4 py-2 rounded-lg 
                  bg-red-600 text-white 
                  hover:bg-red-700 transition
                "
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
