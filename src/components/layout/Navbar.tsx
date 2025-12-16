import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/services" },
    { label: "Noticias", path: "/news" },
    { label: "Nosotros", path: "/nosotros" },
    { label: "Preguntas Frecuentes", path: "/preguntas" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-[#95A6FF]/80 to-[#7DD5FF]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-3xl font-semibold text-white">
          EsSalud
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-white/90 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={
                    isActive
                      ? "rounded-md bg-white px-4 py-1.5 text-sm font-medium text-gray-900 shadow-md"
                      : "rounded-md px-4 py-1.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="rounded-md border border-white/80 bg-white px-4 py-1.5 text-xs font-medium text-gray-900 shadow-sm hover:bg-white/90 transition-colors"
          >
            Registrarse
          </Link>

          <Link
            to="/admin/login"
            className="rounded-md border border-white/80 bg-white px-4 py-1.5 text-xs font-medium text-gray-900 shadow-sm hover:bg-white/90 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}
