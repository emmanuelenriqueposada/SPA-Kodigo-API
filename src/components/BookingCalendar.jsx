import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BookingService from '../services/BookingService';
import Swal from 'sweetalert2';
import './BookingCalendar.css'; // Estilos personalizados

const BookingCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadBookings = async () => {
        try {
            const data = await BookingService.getBookings();
            if (!Array.isArray(data)) throw new Error('La respuesta no es un arreglo');

            const calendarEvents = data.map((booking) => {
                let bgColor;
                switch (booking.status) {
                    case 'CONFIRMED':
                        bgColor = '#22c55e'; // verde
                        break;
                    case 'CANCELLED':
                        bgColor = '#ef4444'; // rojo
                        break;
                    default:
                        bgColor = '#facc15'; // amarillo
                }

                return {
                    id: booking.id,
                    title: `${booking.status} - ${booking.booking}`,
                    start: new Date(booking.check_in_date),
                    end: new Date(booking.check_out_date),
                    backgroundColor: bgColor,
                    borderColor: bgColor,
                    extendedProps: {
                        status: booking.status || 'Sin estado',
                        user: booking.user || 'Sin huésped',
                        checkInDate: booking.check_in_date,
                        checkOutDate: booking.check_out_date,
                    },
                };
            });

            setEvents(calendarEvents);
        } catch (err) {
            console.error('Error al cargar reservas:', err);
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleEventClick = async (clickInfo) => {
        const bookingId = clickInfo.event.id;

        const result = await Swal.fire({
            title: 'Cambiar estado',
            text: 'Selecciona el nuevo estado de la reservación:',
            icon: 'question',
            input: 'select',
            inputOptions: {
                CONFIRMED: 'Confirmar',
                CANCELLED: 'Cancelar',
            },
            inputPlaceholder: 'Selecciona estado',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed && result.value) {
            try {
                await BookingService.updateBookingStatus(bookingId, result.value);
                Swal.fire('Éxito', 'Estado actualizado correctamente.', 'success');
                await loadBookings(); // recarga eventos
            } catch (error) {
                Swal.fire('Error', 'No se pudo actualizar el estado.', 'error');
            }
        }
    };

    if (loading) return <div className="p-6">Cargando calendario...</div>;
    if (error) return <div className="text-red-500 p-6">Error: {error}</div>;
    if (events.length === 0) return <div className="p-6">No hay reservaciones disponibles.</div>;

    return (
        <div className="p-4 lg:p-6">
            <h2 className="text-2xl font-bold mb-4">Calendario de Reservaciones</h2>
            <div className="min-h-[70vh] w-full overflow-y-auto pb-16">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    eventContent={(eventInfo) => (
                        <div className="fc-event-main px-1 py-0.5 text-xs truncate text-white">
                            <strong>{eventInfo.timeText}</strong><br />
                            <i>{eventInfo.event.title}</i><br />
                            <small>
                                Estado: <b>{eventInfo.event.extendedProps.status}</b><br />
                                Entrada: {eventInfo.event.extendedProps.checkInDate}<br />
                                Salida: {eventInfo.event.extendedProps.checkOutDate}<br />
                                Huésped: <em>{eventInfo.event.extendedProps.user}</em>
                            </small>
                        </div>
                    )}
                    height="auto"
                />
            </div>
        </div>
    );
};

export default BookingCalendar;
