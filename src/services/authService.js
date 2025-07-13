

// src/services/authService.js
import api from './api';

export async function loginUser(email, password) {
  const response = await api.post('/api/V1/login', {
    email,
    password,
  });
  return response.data.token; // asegúrate que tu API responde así
}