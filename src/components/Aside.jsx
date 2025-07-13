import { Home, Calendar, LayoutGrid, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Aside() {
  const navigate = useNavigate();
  //protegemos  la pagina 
  const handleLogout = () => {
    // Eliminar token
    sessionStorage.removeItem("token");

    // Redirigir al login
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive
      ? 'bg-blue-100 text-blue-600'
      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
    }`;

  return (
    <aside className="w-64 h-screen p-4 border-r bg-white flex flex-col justify-between hidden min-[1024px]:block">
      <div>
        <div className="flex items-center gap-2 mb-6 px-2 ">
          <LayoutGrid size={22} className="text-gray-600" />
          <span className="font-semibold text-sm text-gray-800">Panel de Control</span>
        </div>

        <nav className="flex flex-col gap-1 border-t-2">
          <NavLink to="alojamientos" className={linkClass}>
            <Home size={20} />
            Alojamientos
          </NavLink>

          <NavLink to="reservaciones" className={linkClass}>
            <Calendar size={20} />
            Reservaciones
          </NavLink>
          <NavLink to="/home/calendario" className={linkClass}>
            <Calendar size={20} />
            Calendario
          </NavLink>
        </nav>
      </div>

      {/* <nav className="flex flex-col gap-1 border-t-2">
          <NavLink to={`/alojamientos`} className={linkClass}>
            <Home size={20} />
            Alojamientos
          </NavLink>

          <NavLink to={`/reservaciones`} className={linkClass}>
            <Calendar size={20} />
            Reservaciones
          </NavLink>
        </nav>
      </div> */}

      {/* Cerrar sesión abajo */}
      <button
        onClick={handleLogout}
        className="flex items-center border-t-2 gap-2 px-3 py-2  text-sm font-medium text-gray-800 hover:bg-red-100 transition"
      >
        <LogOut size={20} />
        Cerrar sesión
      </button>
    </aside>
  );
}

