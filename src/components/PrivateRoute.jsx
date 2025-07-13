

// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token"); // o localStorage si usas eso
    //si el token no esta obliga ala pagina redirigirse ala principal que es el log in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}