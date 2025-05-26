import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSubmitFallas } from "../validation/Fallas";
import axios from "axios";
import { BASE_URL } from "../validation/url";

function Falla() {

    const [sucursal, setSucursal] = useState("");
    const [fecha, setFecha] = useState("");
    const [conductor, setConductor] = useState("");
    const [vehiculo, setVehiculo] = useState("");
    const [placa, setPlaca] = useState("");
    const [detalles, setDetalles] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [placasList, setPlacasList] = useState<string[]>([]);
    const [loadingPlacas, setLoadingPlacas] = useState(true);

    const navigate = useNavigate();

    const fetchPlacas = async () => {
        setLoadingPlacas(true);
        try {
            const response = await axios.get(`${BASE_URL}/placas/get-data-placas`);
            
            if (!response.data || !Array.isArray(response.data)) {
                throw new Error('Formato de respuesta inválido');
            }
        
            const placas = response.data
                .map(p => p?.toString().trim())
                .filter(p => p);
            
            setPlacasList([...new Set(placas)].sort());
        } catch (error) {
            console.error('Error al obtener placas:', error);
            setPlacasList([]);
        } finally {
            setLoadingPlacas(false);
        }
    };

    useEffect(() => {
        fetchPlacas();
    }, []);

    const handleSubmitFalla = async (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const Successful = await handleSubmitFallas(event, sucursal, fecha, conductor, vehiculo, placa, detalles);

        if (Successful) {
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">R07-PT-19 REVISIÓN DE VEHÍCULOS</h1>
            <form
                onSubmit={handleSubmitFalla}
                className="w-full max-w-3xl bg-white p-6 rounded shadow-md space-y-4"
            >
                <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">Sucursal:</label>
                        <select
                            value={sucursal}
                            onChange={(e) => setSucursal(e.target.value)}
                            name="fecha"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        >
                            <option value="">Seleccione una Sucursal</option>
                            <option value="(SU01) Casa Matriz Mañanitas">Casa Matriz Mañanitas</option>
                            <option value="(SU02) Chiriquí">Chiriquí</option>
                            <option value="(SU03) Chorrera">Chorrera</option>
                            <option value="(SU04) Chorrera Planta">Chorrera Planta</option>
                            <option value="(SU05) Colón">Colón</option>
                            <option value="(SU06) Juan Díaz">Juan Díaz</option>
                            <option value="(SU08) Aguadulce">Aguadulce</option>
                            <option value="(SU09) Los Santos">Los Santos</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">Fecha:</label>
                        <input
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            type="date"
                            name="fecha"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">Nombre legible del Conductor:</label>
                        <input
                            value={conductor}
                            onChange={(e) => setConductor(e.target.value)}
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Nombre del Conductor"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">N° de Vehículo:</label>
                        <input
                            value={vehiculo}
                            onChange={(e) => setVehiculo(e.target.value)}
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Número de Vehículo"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700">N° Placa:</label>
                        <select
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            required
                            disabled={loadingPlacas}
                        >
                            {loadingPlacas ? (
                                <option value="">Cargando placas...</option>
                            ) : placasList.length === 0 ? (
                                <option value="" disabled>No hay placas registradas</option>
                            ) : (
                                <>
                                    <option value="">Seleccione una placa</option>
                                    {placasList.map((placaItem, index) => (
                                        <option key={`${placaItem}-${index}`} value={placaItem}>
                                            {placaItem}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Detalle de la Falla Vehicular detectada:</label>
                    <textarea
                        value={detalles}
                        onChange={(e) => setDetalles(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded h-48"
                        placeholder="Describa la falla vehicular detectada aquí"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>

        </div>
    );
}

export default Falla;

