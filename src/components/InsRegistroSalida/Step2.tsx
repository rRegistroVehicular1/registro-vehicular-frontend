import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';

type Step2Props = {
    placa: string;
    setPlaca: (value: string) => void;
    conductor: string;
    setConductor: (value: string) => void;
    tipoVehiculo: string;
    setTipoVehiculo: (value: string) => void;
    odometroSalida: string;
    setOdometroSalida: (value: string) => void;
    onPrevious: () => void;
    onNext: () => void;
    datos: string[];
    actualizarLlantasPorTipo: (tipo: string) => void;
}

function StepDos({ 
    placa, 
    setPlaca, 
    conductor, 
    setConductor, 
    tipoVehiculo, 
    setTipoVehiculo, 
    odometroSalida, 
    setOdometroSalida, 
    onPrevious, 
    onNext, 
    datos, 
    actualizarLlantasPorTipo 
}: Step2Props) {
    
    const [placasList, setPlacasList] = useState<string[]>([]);
    const [loadingPlacas, setLoadingPlacas] = useState(true);
    const [loadingOdometro, setLoadingOdometro] = useState(false);
    const [lastOdometro, setLastOdometro] = useState<number | null>(null);

    const fetchLastOdometro = async (selectedPlaca: string) => {
        if (!selectedPlaca) {
            setLastOdometro(null);
            return;
        }

        setLoadingOdometro(true);
        try {
            const response = await axios.get<{lastOdometro: number}>(`${BASE_URL}/ins-registro-entrada/last-odometro`, {
                params: { placa: selectedPlaca }
            });
            setLastOdometro(response.data.lastOdometro || 0);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error al obtener odómetro:', {
                    message: error.message,
                    response: error.response?.data
                });
            }
            setLastOdometro(null);
        } finally {
            setLoadingOdometro(false);
        }
    };

    const fetchPlacas = async () => {
          try {
            console.log("Iniciando obtención de placas...");
            const response = await axios.get<string[] | {data: string[]}>(`${BASE_URL}/placas/get-data-placas`);

            let placas: string[] = [];
              
            if (Array.isArray(response.data)) {
                placas = response.data;
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                placas = response.data.data;
            }

            // Limpiar y validar las placas
            const placasValidas = placas
                .map(item => item?.toString().trim())
                .filter((item): item is string => !!item && item.length > 0);

            setPlacasList([...new Set(placasValidas)]);
              
          } catch (error: unknown) {
            console.error('Error al obtener placas:', error instanceof Error ? error.message : error);
            setPlacasList(["PLACA1", "PLACA2", "PLACA3"]); // Datos de prueba
          } finally {
            setLoadingPlacas(false);
          }
    };
    
    useEffect(() => {
        fetchPlacas();
    }, []);

    useEffect(() => {
        if (placa) {
            fetchLastOdometro(placa);
        }
    }, [placa]);

    const validateStep2 = () => {
        if (!placa || !conductor || !tipoVehiculo || !odometroSalida) {
            alert("Todos los campos son obligatorios");
            return false;
        }

        const odometroValue = Number(odometroSalida);
        if (isNaN(odometroValue) || odometroValue < 0) {
            alert("Odómetro debe ser un número positivo");
            return false;
        }

        if (lastOdometro !== null && odometroValue < lastOdometro) {
            alert(`El odómetro no puede ser menor al último registro (${lastOdometro})`);
            return false;
        }

        return true;
    };

    const handleTipoVehiculoChange = (value: string) => {
        setTipoVehiculo(value);
        actualizarLlantasPorTipo(value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block mb-4">
                Placa del Vehículo:
                <select
                    value={placa}
                    onChange={(e) => {
                        setPlaca(e.target.value);
                        fetchLastOdometro(e.target.value);
                    }}
                    className="mt-1 p-2 border rounded w-full"
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
            </label>

            <label className="block mb-4">
                Nombre del Conductor:
                <input
                    type="text"
                    value={conductor}
                    onChange={(e) => setConductor(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                />
            </label>

            <label className="block mb-4">
                Tipo de Vehículo:
                <select
                    value={tipoVehiculo}
                    onChange={(e) => handleTipoVehiculoChange(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="sedan">Sedán</option>
                    <option value="pickup">Pickup</option>
                    <option value="panel">Panel</option>
                    <option value="camion">Camión</option>
                </select>
            </label>

            <label className="block mb-4">
                Odómetro de Salida:
                <input
                    type="number"
                    min={lastOdometro || 0}
                    value={odometroSalida}
                    onChange={(e) => setOdometroSalida(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                />
                {lastOdometro !== null && (
                    <p className="text-sm text-gray-500 mt-1">
                        Último registro: {lastOdometro} (Ingrese igual o mayor)
                    </p>
                )}
            </label>
            
            <div className="col-span-1 md:col-span-2 flex justify-between">
                <button 
                    type="button" 
                    className="bg-gray-500 text-white px-4 py-2 rounded" 
                    onClick={onPrevious}
                >
                    Atrás
                </button>
                <button 
                    type="button" 
                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                    onClick={() => validateStep2() && onNext()}
                    disabled={loadingPlacas || loadingOdometro}
                >
                    {loadingOdometro ? 'Validando...' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
}

export default StepDos;
