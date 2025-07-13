import React from 'react'
import { useForm } from 'react-hook-form';
import { createAccommodation } from '../services/accommodationService';
import { CirclePlus } from 'lucide-react';
import Swal from "sweetalert2";

export default function NewAlojamiento() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await createAccommodation(data);
            Swal.fire("Éxito", "Alojamiento registrado correctamente", "success");

            reset(); // limpia formulario (de react-hook-form)
            document.getElementById("my_modal_4").close(); // cierra el modal

        } catch (error) {
            console.error("Error al guardar alojamiento:", error);

            const message =
                error.response?.data?.message || "No se pudo registrar el alojamiento";

            Swal.fire("Error", message, "error");
        }
    };
    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn flex gap-2 items-center bg-black text-white hover:bg-gray-900 flex justify-center gap-1 p-2 rounded-md" onClick={() => document.getElementById('my_modal_4').showModal()}> <CirclePlus /> Nuevo Alojamiento</button>

            <dialog id="my_modal_4" className="modal backdrop:bg-slate-50/65 bg-slate-200 rounded-xl">

                <div className="modal-box flex justify-center items-center ">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="modal-action mx-8 my-4">
                        {/* Formulario */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-12/12  p-8">
                            <h1 className='flex justify-start font bold text-xl'>Nuevo Alojamiento</h1>
                            {/* Nombre */}
                            <div>
                                <label className="text-lg flex items-start font-medium text-balance">Nombre</label>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        placeholder="Nombre del Alojamiento"
                                        className=" input input-bordered w-full rounded-md  p-3"
                                    />
                                </div>
                            </div>
                            {/* Dirección */}
                            <div>
                                <label className="text-lg flex items-start font-medium text-center">Dirección</label>
                                <div className="relative mt-1">
                                    <input
                                        type="text"
                                        {...register("address", { required: true })}
                                        placeholder="Dirección del alojamiento"
                                        className=" input input-bordered w-full p-3"
                                    />
                                </div>
                            </div>
                            {/* Descripcion */}
                            <div>
                                <div className="flex justify-between items-center">
                                    <label className="text-lg font-medium mb-2">Descripción </label>

                                </div>
                                <div className="relative mt-1">

                                    <textarea
                                        className=" pl-4 textarea textarea-bordered w-full pb-12 "
                                        placeholder="Descripcion"
                                        {...register("description", { required: true })}
                                    />

                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                {/* Botón */}
                                <button
                                    type="reset"
                                    className="btn w-full items-center bg-black text-white hover:bg-gray-900 flex justify-center gap-1  rounded-md text-sm"
                                >
                                    Reset
                                </button>
                                {/* Botón */}
                                <button
                                    type="submit"
                                    className="btn w-full items-center bg-black text-white hover:bg-gray-900 flex justify-center gap-1 rounded-md text-xs py-2"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}