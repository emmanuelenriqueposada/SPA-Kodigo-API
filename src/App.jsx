// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Alojamientos from "./pages/Alojamientos";
import Reservaciones from "./pages/Reservaciones";
import PrivateRoute from "./components/PrivateRoute";
import Calendario from "./pages/Calendario"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Agrupamos las rutas hijas dentro de /home */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route index element={<Alojamientos />} /> {/* default al entrar a /home */}
        <Route path="alojamientos" element={<Alojamientos />} />
        <Route path="reservaciones" element={<Reservaciones />} />
        <Route path="calendario" element={<Calendario />} />         
      </Route>
    </Routes>
  );
}
export default App;
