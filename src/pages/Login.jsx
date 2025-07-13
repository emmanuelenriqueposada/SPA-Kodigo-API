// import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {  LogIn, Info, Mail, Lock, KeySquare, HelpCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const { login, loading, error } = useAuth();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/home'); //  Redirige a la ruta /home
    }
    reset();
  };

  return (
    <>
      <div className="min-h-dvh flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

          {/* Título */}
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-2 text-2xl font-bold">
              <LogIn />
              <h1>Iniciar Sesión</h1>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-2">
              <Info className="text-blue-500" size={16} />
              <p>Ingresa tus credenciales para acceder al sistema</p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="text-lg flex items-start font-medium ">Correo Electrónico</label>
              <div className="relative mt-2">
                <Mail className="absolute inset-y-3 left-0 w-10" size={20} />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="correo@ejemplo.com"
                  className="pl-10 input input-bordered w-full rounded-md font-bold p-2"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-lg font-medium">Contraseña</label>
                <button type="button" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  <KeySquare size={14} />
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute inset-y-3 left-3" size={20} />
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                  className="pl-10 input input-bordered w-full p-3"
                />
              </div>
            </div>

            {/* Error de login */}
            {error && (
              <div className="text-red-500 text-sm font-bold">
                {error}
              </div>
            )}

            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="checkbox" {...register("remember")} />
              <label className="text-lg">Mantener sesión iniciada</label>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full items-center bg-black text-white hover:bg-gray-900 flex justify-center gap-1 p-2 rounded-md"
            >
              <LogIn size={18} />
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Ayuda */}
          <div className="text-sm text-center mt-4 font-bold">
            <p className="text-gray-600">
              <HelpCircle className="inline mr-1" size={14} />
              ¿Necesitas ayuda? <a href="#" className="text-blue-600 hover:underline">Contacta soporte Kodigo</a>
            </p>
          </div>

          {/* Pie de página */}
          <div className="text-center text-xs text-gray-400 mt-6 font-bold">
            <ShieldCheck className="inline-block mr-1" size={14} />
            Este es un sistema seguro. Tus datos están protegidos.
          </div>
        </div>
      </div>
    </>
  );
}


export default Login