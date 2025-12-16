import { loginAdmin } from "../../service/api";
import { Lock, User } from "lucide-react";
import loginImg from "../../assets/images/LoginImg.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginCard() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const resp = await loginAdmin(usuario, contrasenia);

      if (resp.estado === true) {
        localStorage.setItem("admin", JSON.stringify(resp.objetoRespuesta));

        navigate("/admin/home");
      } else {
        setError(resp.mensaje || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
    }

    setLoading(false);
  };

  return (
    <div
      className="
      w-full max-w-5xl 
      bg-white rounded-[2rem] 
      shadow-[0_8px_30px_rgba(0,0,0,0.10)]
      overflow-hidden 
      flex flex-col md:flex-row
    "
    >
      <div
        className="
    md:w-1/2 
    bg-gradient-to-b 
    from-[#E5F7FD] 
    via-[#DBF2FC] 
    to-[#ADDCF2]
    flex items-center justify-center
  "
      >
        <img
          src={loginImg}
          alt="Ilustración EsSalud"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:w-1/2 bg-[#F8FBFF] flex flex-col justify-center px-8 py-10">
        <div
          className="
            bg-white 
            rounded-3xl 
            shadow-[0px_8px_25px_rgba(0,0,0,0.08)]
            p-8 m-3
        "
        >
          <h2 className="text-3xl font-semibold text-[#0A3761] text-center mb-10">
            Portal del Administrador
          </h2>

          <div className="mb-6">
            <label className="text-sm text-gray-700">Ingresa tu Usuario</label>
            <div className="mt-2 flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
              <User size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="flex-1 text-sm outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700">
              Ingresa tu contraseña
            </label>
            <div className="mt-2 flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
              <Lock size={18} className="text-gray-500" />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="flex-1 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 w-4 h-4 rounded border-gray-400"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Recordar Sesión
            </label>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="
              w-full bg-[#0A4C78] text-white py-3 rounded-xl 
              shadow-md hover:bg-[#083d63] transition font-medium
            "
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-xs text-gray-400 mt-8">
            © EsSalud Perú 2025 - Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
