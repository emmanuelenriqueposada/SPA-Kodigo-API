import { useState, useEffect } from "react";
import { MapPin, Info, Trash2, Pencil, Menu, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAccommodations } from "../services/accommodationService";
import NewAlojamiento from "../components/NewAlojamiento";

export default function Alojamientos() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("alojamientos");
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccommodations();
        setAccommodations(data);
      } catch (error) {
        console.error("Error al obtener alojamientos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR MOBILE */}
      <nav className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-50 lg:hidden">
        <h1 className="text-xl font-bold text-gray-800">Kodigo App</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800">
          <Menu size={24} />
        </button>
      </nav>

      {/* Menú desplegable mobile */}
      {menuOpen && (
        <div className="bg-white shadow-md p-4 space-y-2 lg:hidden">
          <a
            href="/home/alojamientos"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
          >
            Alojamientos
          </a>
          <a
            href="/home/reservaciones"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
          >
            Reservaciones
          </a>
          <a
            href="/home/calendario"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-bold"
          >
            Calendario
          </a>
        </div>
      )}

      {/* Botón en pantallas grandes */}
      <div className="hidden lg:block px-4 pb-4 mb-2 flex justify-end">
        <button
          onClick={() => navigate("/home/calendario")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Calendar size={18} /> Ir al Calendario
        </button>
      </div>

      {/* Título y formulario */}
      <div className="hidden lg:block">
        {activeView === "alojamientos" && (
          <div className="flex flex-wrap justify-between items-center px-4 pb-4 mb-4">
            <h1 className="text-2xl font-bold">Alojamientos</h1>
            <NewAlojamiento />
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="mt-6 space-y-4 px-4 ">
        {activeView === "alojamientos" ? (
          accommodations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-md shadow p-4 flex justify-between items-start hover:shadow-xl"
            >
              <div className="lg:text-lg text-xs text-wrap leading-loose w-full m-1">
                <h2 className="flex items-start font-extrabold mb-4">{item.name}</h2>

                <div className="hidden md:block text-gray-600 flex items-center gap-2 mt-1">
                  <MapPin size={14} /> {item.address || "Dirección no disponible"}
                </div>
                <div className="sm:hidden text-gray-600 mt-1">{item.address || "Dirección no disponible"}</div>

                <div className="hidden md:block text-gray-500 flex items-center gap-2 mt-1">
                  <Info size={14} /> {item.description || "Sin descripción"}
                </div>
                <div className="sm:hidden text-gray-500 mt-1">
                  {item.description ? item.description.slice(0, 80) + (item.description.length > 100 ? "..." : "") : "Sin descripción"}
                </div>
              </div>
              <div className="flex gap-2 m-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Pencil size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-md shadow p-4 text-gray-700">
            <h2 className="text-lg font-bold">Reservaciones</h2>
            <p>Aquí se mostrarán las reservaciones próximamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
