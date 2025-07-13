import api from "./api";

// ---------------Obtener todas las reservaciones registradas---------------
const getBookings = async () => {
    try {
        const response = await api.get("/api/V1/bookings");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservaciones:", error);
        throw error;
    }
};

// ---------------Crear nueva reservación---------------
const createBooking = async (data, token) => {
    try {
        const response = await api.post("/api/V1/booking", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear la reservación:", error);
        throw error;
    }
};

// ---------------Actualizar el estado de una reservación---------------
const updateBookingStatus = async (bookingId, newStatus) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.patch(
            `/api/V1/status_booking/${bookingId}`,
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el estado de la reservación:", error);
        throw error;
    }
};

// ---------------Obtener la lista de usuarios disponibles---------------
const getUsers = async () => {
    try {
        const response = await api.get("/api/V1/users");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error;
    }
};

// ---------------Obtener la lista de alojamientos disponibles---------------
const getAccommodations = async () => {
    try {
        const response = await api.get("/api/V1/accomodations");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los alojamientos:", error);
        throw error;
    }
};

export default {
    getBookings,
    createBooking,
    updateBookingStatus,
    getUsers,
    getAccommodations,
};
