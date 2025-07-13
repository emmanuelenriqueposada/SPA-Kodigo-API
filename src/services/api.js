

// src/services/api.js
import axios from 'axios';
//agregamos el path de la api y basado en lo que se hara agregar lo restante del path segun su funcion
const api = axios.create({
  baseURL: 'https://apibookingsaccomodations-production.up.railway.app', 
});

api.interceptors.request.use((config) => {
    //guardamos el token en el ssesionStorage
  const token = sessionStorage.getItem('token');
  if (token) {
    //si devuelver el token o esta guardado este ocupara el token para validar el paso y lo añade al emcabezado
    config.headers.Authorization = `Bearer ${token}`;
  }
  //retorna el token
  return config;
});

export default api;