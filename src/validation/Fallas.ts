import axios from "axios";
import { FormEvent } from "react";
import { BASE_URL } from "./url";

export const handleSubmitFallas = async (
    event: FormEvent,
    sucursal: string,
    fecha: string,
    conductor: string,
    vehiculo: string,
    placa: string,
    detalles: string
): Promise<boolean> => {
    event.preventDefault();

    if (sucursal === "") {
        alert("Ingrese la sucursal");
        return false;
    }

    if (fecha === "") {
        alert("Ingrese la fecha");
        return false;
    }

    if (conductor === "") {
        alert("Ingrese el nombre del conductor");
        return false;
    }

    if (vehiculo === "") {
        alert("Ingrese el nombre del conductor");
        return false;
    }

    if (placa === "") {
        alert("Ingrese la placa");
        return false;
    }

    if (detalles === "") {
        alert("Ingrese el detalles");
        return false;
    }

    try {
        const response = await axios.post(`${BASE_URL}/registro-falla/register`, { sucursal, fecha, conductor, vehiculo, placa, detalles });
        alert(response.data.message);
        return true;
    } catch (error: any) {
        alert('Error al registrar los datos');
        return false;
    }
};