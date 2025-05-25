import axios from 'axios';
import { Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { BASE_URL } from './url';

export const handleSubmit = async (
    e: React.FormEvent,
    formData: { revisiones: any[]; observacion: string; odometro: string },
    setIsSubmitting: (value: boolean) => void,
    setFormData: (data: { revisiones: any[]; observacion: string; odometro: string }) => void,
    navigate: (path: string) => void
) => {
    e.preventDefault();

    try {
        // Validación de campos completos
        const allFilled = formData.revisiones.every(item => item.opcion !== null);
        if (!allFilled) {
            throw new Error("Por favor, selecciona una opción en todas las revisiones");
        }

        // Validación de odómetro
        const odometroNum = Number(formData.odometro);
        if (isNaN(odometroNum) || odometroNum < 0) {
            throw new Error("El odómetro debe ser un número válido");
        }

        setIsSubmitting(true);
        
        const lastPlacaInfo = localStorage.getItem('lastPlacaInfo');
        if (!lastPlacaInfo) {
            throw new Error('No se encontró información del vehículo');
        }
        console.log('La ultima placa es:', lastPlacaInfo);
        // Obtiene la matricula del vehiculo
        const placaInfo = JSON.parse(lastPlacaInfo);
        const placa = placaInfo.placa; // Extrae la placa
        const rowIndex = placaInfo.rowIndex; // Extrae el índice
        
        console.log("Placa obtenida:", placa); // ¡Debe tener valor!
        console.log("RowIndex:", rowIndex);

        if (!placa) {
            throw new Error('No se encontró la placa en lastPlacaInfo');
        }
        
        //Obtiene el ultimo registro de odometro entrada registrado
        const lastOdometroResponse = await axios.get(`${BASE_URL}/ins-registro-entrada/last-odometro`, {
            params: { placa }
        });

        const lastOdometro = Number(lastOdometroResponse.data.lastOdometro) || 0;
        
        // Valida que el odometro SALIDA actual sea mayor al de ENTRADA
        if (odometroNum <= lastOdometro) {
            throw new Error(`El odómetro de entrada (${odometroNum}) debe ser mayor al último registro (${lastOdometro})`);
        }

        // Obtiene el ultimo odometro de SALIDA registrado
        const lastOdometroSalidaResponse = await axios.get(`${BASE_URL}/ins-registro-entrada/last-odometro-salida`, {
            params: { placa }
        });
        
        const lastOdometroSalida = Number(lastOdometroSalidaResponse.data.lastOdometroSalida) || 0;
        
        // Valida que el odometro de ENTRADA sea mayor al de SALIDA
        if (odometroNum <= lastOdometroSalida) {
            throw new Error(`El odómetro de entrada (${odometroNum}) debe ser mayor al último odómetro de salida registrado (${lastOdometroSalida})`);
        }
        
        const response = await axios.post(
            `${BASE_URL}/ins-registro-entrada/register`,
            {
                revisiones: formData.revisiones,
                observacion: formData.observacion,
                odometro: formData.odometro,
                lastPlacaInfo: lastPlacaInfo,
                placa: placa
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.message) {
            alert(response.data.message);
            // Resetear formulario
            setFormData({
                revisiones: formData.revisiones.map(item => ({
                    ...item,
                    opcion: null
                })),
                observacion: '',
                odometro: ''
            });
            localStorage.removeItem('lastPlacaInfo');
            navigate('/');
        }
    } catch (error: any) {
        alert(error.message || 'Error al registrar los datos');
        console.error('Error:', error);
    } finally {
        setIsSubmitting(false);
    }
};
