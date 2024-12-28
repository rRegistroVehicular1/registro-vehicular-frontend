import axios from "axios";
import { BASE_URL } from "../validation/url";

export const handleSubmit = async (
    placa: string,
    setError: (error: string) => void
): Promise<{ success: boolean; message?: string; data?: any }> => {
    if (!placa.trim()) {
        setError("El campo de placa es obligatorio.");
        return { success: false, message: "El campo de placa es obligatorio." };
    }
    setError("");

    try {
        const response = await axios.post(`${BASE_URL}/home/register-placa`, {
            placa,
        });

        if (response.data.rowIndex > 0) {
            return {
                success: true,
                data: {
                    rowIndex: response.data.rowIndex, 
                    estado: response.data.estado,
                    lastTimestamp: response.data.lastTimestamp, 
                },
            };
        }

        return { success: false, message: response.data.message || "Error desconocido." };
    } catch (error: any) {
        console.error("Error:", error);
        setError("Ocurrió un error al consultar la placa.");
        return { success: false, message: "Ocurrió un error al consultar la placa." }; 
    }
};
