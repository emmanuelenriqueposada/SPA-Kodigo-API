import { useState, useEffect } from 'react';
import { ClipboardPlus, CalendarDays, Menu } from 'lucide-react';
import Swal from 'sweetalert2';
import BookingService from '../services/BookingService';

export default function Reservaciones() {
  const [formData, setFormData] = useState({
    booking: '',
    check_in_date: '',
    check_out_date: '',
    total_amount: '',
    status: 'CONFIRMED',
    accomodation_id: '',
    user_id: '',
  });

  const [users, setUsers] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [createdBookings, setCreatedBookings] = useState([]);
  const [storedBookings, setStoredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // 🧭 para menú móvil
  const token = sessionStorage.getItem('token');

  const bookingOptions = Array.from({ length: 10 }, (_, i) => `BK20250${i + 1}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await BookingService.getUsers();
        const accData = await BookingService.getAccommodations();
        setUsers(usersData);
        setAccommodations(accData);
        setIsLoading(true);
        const bookingsData = await BookingService.getBookings();
        setStoredBookings(bookingsData);
        setIsLoading(false);
      } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar datos desde el servidor', 'error');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: '¿Deseas guardar esta reservación?',
      text: `Código: ${formData.booking}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await BookingService.createBooking(formData, token);
      Swal.fire('Reservación almacenada', 'Se guardó exitosamente', 'success');
      setCreatedBookings(prev => [...prev, result]);
      setStoredBookings(prev => [...prev, result]);
      setFormData({
        booking: '',
        check_in_date: '',
        check_out_date: '',
        total_amount: '',
        status: 'CONFIRMED',
        accomodation_id: '',
        user_id: '',
      });
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la reservación', 'error');
    }
  };

  const cambiarEstado = async (booking) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Cambiar estado',
      input: 'select',
      inputOptions: {
        CONFIRMED: 'Confirmado',
        CANCELLED: 'Cancelado',
        PENDING: 'Pendiente',
      },
      inputPlaceholder: 'Selecciona nuevo estado',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    });

    if (!newStatus) return;

    try {
      await BookingService.updateBookingStatus(booking.id, newStatus);
      Swal.fire('Estado actualizado', `Nuevo estado: ${newStatus}`, 'success');
      setStoredBookings(prev =>
        prev.map(b => b.id === booking.id ? { ...b, status: newStatus } : b)
      );
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">

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
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-bold"
          >
            Reservaciones
          </a>
          <a
            href="/home/calendario"
            className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 font-medium"
          >
            Calendario
          </a>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="p-4 space-y-10">
        {/* Formulario */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ClipboardPlus /> Crear nueva reservación
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
            <select name="booking" value={formData.booking} onChange={handleChange} required className="border px-3 py-2 rounded">
              <option value="">Selecciona código</option>
              {bookingOptions.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>

            <input name="total_amount" value={formData.total_amount} onChange={handleChange} type="number" placeholder="Monto total" required className="border px-3 py-2 rounded" />
            <input name="check_in_date" value={formData.check_in_date} onChange={handleChange} type="date" required className="border px-3 py-2 rounded" />
            <input name="check_out_date" value={formData.check_out_date} onChange={handleChange} type="date" required className="border px-3 py-2 rounded" />

            <select name="accomodation_id" value={formData.accomodation_id} onChange={handleChange} required className="border px-3 py-2 rounded">
              <option value="">Selecciona alojamiento</option>
              {accommodations.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>

            <select name="user_id" value={formData.user_id} onChange={handleChange} required className="border px-3 py-2 rounded">
              <option value="">Selecciona huésped</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <select name="status" value={formData.status} onChange={handleChange} className="md:col-span-2 border px-3 py-2 rounded">
              <option value="CONFIRMED">Confirmado</option>
              <option value="CANCELLED">Cancelado</option>
              <option value="PENDING">Pendiente</option>
            </select>

            <div className="md:col-span-2 text-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Guardar reservación
              </button>
            </div>
          </form>
        </div>

        {/* Reservaciones creadas en sesión */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CalendarDays /> Reservaciones registradas en esta sesión
          </h2>
          {createdBookings.length === 0 ? (
            <p className="text-gray-500">No hay reservaciones nuevas en esta sesión.</p>
          ) : (
            <div className="space-y-4">
              {createdBookings.map(r => (
                <div key={r.id} className="bg-white p-4 rounded shadow border">
                  <p className="text-lg font-semibold">{r.booking}</p>
                  <p className="text-sm text-gray-600">Estado: <strong>{r.status}</strong></p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reservaciones desde API */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CalendarDays /> Reservaciones almacenadas en la base de datos
          </h2>
          {isLoading ? (
            <p className="text-gray-400 italic">Cargando reservaciones...</p>
          ) : storedBookings.length === 0 ? (
            <p className="text-gray-500">No hay reservaciones almacenadas en el sistema.</p>
          ) : (
            <div className="space-y-4">
              {storedBookings.map(r => (
                <div key={r.id} className="bg-white p-4 rounded shadow border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">{r.booking}</p>
                      <p className="text-sm text-gray-600">Huésped: <strong>{r.user}</strong></p>
                      <p className="text-sm text-gray-600">Alojamiento: <strong>{r.accomodation}</strong></p>
                      <p className="text-sm text-gray-500">Ingreso: {r.check_in_date} | Salida: {r.check_out_date}</p>
                      <p className="text-sm text-gray-600">Monto: ${r.total_amount}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full
                        ${r.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' : ''}
                        ${r.status === 'CANCELLED' ? 'bg-red-200 text-red-800' : ''}
                        ${r.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' : ''}
                      `}>
                        {r.status}
                      </span>
                      <button
                        className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => cambiarEstado(r)}
                      >
                        Cambiar estado
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
