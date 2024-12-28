import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../validation/url';

interface Registro {
    Conductor: string;
    Placa: string;
    Hora: string;
    Fecha: string;
    Sucursal: string;
}

function Salidas() {
    const [selectedPlaca, setSelectedPlaca] = useState('');
    const [selectedSucursal, setSelectedSucursal] = useState('');
    const [datos, setDatos] = useState<Registro[]>([]);
    const navigate = useNavigate();

    const setLimpiar = () => {
        setSelectedPlaca('');
        setSelectedSucursal('');
    };

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/salidas/get-salidas`);
                setDatos(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        obtenerDatos();
    }, []);

    const verificarSalida = () => {
        const coincidencias = datos.filter(fila =>
            fila.Placa === selectedPlaca && fila.Sucursal === selectedSucursal
        );

        if (coincidencias.length > 0) {
            const ultimaEntrada = coincidencias.reduce((prev, current) =>
                prev.Hora > current.Hora ? prev : current
            );

            console.log("Última entrada encontrada:", ultimaEntrada);
            alert(`Última entrada válida encontrada:\nPlaca: ${ultimaEntrada.Placa}\nHora: ${ultimaEntrada.Hora}`);
        } else {
            alert("Registro no encontrado. Redirigiendo...");
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">R06-PT-19 REVISIÓN DE VEHÍCULOS</h1>
            <form className="w-full max-w-md bg-white p-6 rounded shadow-md">
                <label className="block mb-4">
                    Placa
                    <input
                        type="text"
                        className="mt-1 p-2 border rounded w-full"
                        value={selectedPlaca}
                        onChange={(e) => setSelectedPlaca(e.target.value)}
                        placeholder="Ingrese la placa"
                        required
                    />
                </label>
                <label className="block mb-4">
                    Selecciona la sucursal
                    <select
                        className="mt-1 p-2 border rounded w-full"
                        value={selectedSucursal}
                        onChange={(e) => setSelectedSucursal(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecciona una sucursal</option>
                        {Array.from(new Set(datos.map(fila => fila.Sucursal))).map((sucursal, index) => (
                            <option key={index} value={sucursal}>{sucursal}</option>
                        ))}
                    </select>
                </label>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
                    onClick={verificarSalida}
                >
                    Verificar Salida
                </button>
                <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                    onClick={setLimpiar}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default Salidas;
