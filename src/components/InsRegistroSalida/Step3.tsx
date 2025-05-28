import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';

type Step3Props = {
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

function StepTres({ 
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
}: Step3Props) {
    
    const [placasList, setPlacasList] = useState<string[]>([]);
    const [loadingPlacas, setLoadingPlacas] = useState(true);
    const [loadingOdometro, setLoadingOdometro] = useState(false);
    const [lastOdometro, setLastOdometro] = useState<number | null>(null);
    const [vehiculosMap, setVehiculosMap] = useState<Record<string, string>>({});

    // Nuevo método independiente para obtener placas y tipos de vehículo
    const fetchPlacasYTipoVehiculo = async () => {
        setLoadingPlacas(true);
        try {
            const response = await axios.get(`${BASE_URL}/placas/get-placas-y-tipos`);
            
            if (!response.data || !Array.isArray(response.data)) {
                throw new Error('Formato de respuesta inválido');
            }
            
            // Procesar datos para obtener lista de placas
            const placas = response.data
                .map(item => item?.placa?.toString().trim())
                .filter(placa => placa);
            
            // Crear mapeo de placa a tipo de vehículo
            const map: Record<string, string> = {};
            response.data.forEach(item => {
                if (item.placa && item.tipoVehiculo) {
                    map[item.placa.toString().trim()] = item.tipoVehiculo.toString().trim().toLowerCase();
                }
            });
            
            setPlacasList([...new Set(placas)].sort());
            setVehiculosMap(map);
        } catch (error) {
            console.error('Error al obtener placas y tipos:', error);
            setPlacasList([]);
            setVehiculosMap({});
            alert('Error al cargar los datos de vehículos');
        } finally {
            setLoadingPlacas(false);
        }
    };
    
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
        alert('Error al cargar las placas disponibles');
      } finally {
        setLoadingPlacas(false);
      }
    };

    const fetchLastOdometro = async (selectedPlaca: string) => {
        console.log('Placa seleccionada:', selectedPlaca);
      if (!selectedPlaca) {
        setLastOdometro(null);
        return;
      }
    
      setLoadingOdometro(true);
      try {
        console.log('Buscando odometro para la placa:', selectedPlaca);
        const response = await axios.get(`${BASE_URL}/ins-registro-entrada/last-odometro`, {
            params: { placa: selectedPlaca }
        });
        
        // Validar respuesta
        let odometro = 0;
        if (typeof response.data === 'number') {
          odometro = response.data;
        } else if (response.data?.lastOdometro !== undefined) {
          odometro = Number(response.data.lastOdometro) || 0;
        }
        
        if (isNaN(odometro)) {
          throw new Error('Formato de Odómetro inválido');
        }
        
        setLastOdometro(odometro);

        // Sugerir automáticamente el último odómetro como valor inicial
        if (odometro > 0 && (!odometroSalida || Number(odometroSalida) < odometro)) {
          setOdometroSalida(String(odometro));
        }
      } catch (error) {
        console.error('Error al obtener odómetro:', error);
        setLastOdometro(null);
        alert('No se pudo obtener el último odómetro');
      } finally {
        setLoadingOdometro(false);
      }
    };
    
    useEffect(() => {
        fetchPlacasYTipoVehiculo();
        fetchPlacas();
    }, []);

    useEffect(() => {
        if (placa) {
            fetchLastOdometro(placa);
            
            // Autocompletar tipo de vehículo cuando se selecciona una placa
            if (vehiculosMap[placa]) {
                const tipo = vehiculosMap[placa];
                setTipoVehiculo(tipo);
                actualizarLlantasPorTipo(tipo);
            }
        } else {
        setLastOdometro(null);
        }
    }, [placa, vehiculosMap]);

    useEffect(() => {
        if (odometroSalida && lastOdometro !== null) {
            const currentValue = Number(odometroSalida);
            if (!isNaN(currentValue) && currentValue < lastOdometro) {
                // El campo ya se marca en rojo por la clase CSS
                console.log(`Advertencia: Odómetro actual (${currentValue}) es menor que el último registro (${lastOdometro})`);
            }
        }
    }, [odometroSalida, lastOdometro]);

    const validateStep3 = () => {
        if (!placa || !conductor || !tipoVehiculo || !odometroSalida) {
            alert("Todos los campos son obligatorios");
            return false;
        }

        const odometroValue = Number(odometroSalida);
        if (isNaN(odometroValue) || odometroValue < 0){
            alert("Odómetro debe ser un número valido y positivo");
            return false;
        }

        if (lastOdometro !== null && lastOdometro > 0 && odometroValue < lastOdometro) {
            alert(`El odómetro de salida (${odometroValue}) debe ser mayor al último registro (${lastOdometro})`);
            return false;
        }

        console.log(`placa: ${placa} - conductor: ${conductor} - tipoVehiculo: ${tipoVehiculo} - odometroSalida: ${odometroSalida}`)

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
                        console.log("Placa seleccionada en onChange:", e.target.value); // Debug
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
                <input
                    type="text"
                    value={tipoVehiculo}
                    readOnly
                    className="mt-1 p-2 border rounded w-full bg-gray-100"
                />  
            </label>

            <label className="block mb-4">
                Odómetro de Salida:
                <input
                    type="number"
                    min={lastOdometro || 0}
                    value={odometroSalida}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[0-9]*$/.test(value)) {
                            setOdometroSalida(value);
                        }
                    }}
                    className={`mt-1 p-2 border rounded w-full${
                        lastOdometro !== null && Number(odometroSalida) < lastOdometro 
                            ? 'border-red-500 bg-red-50' 
                            : ''
                        }`}
                    required
                    disabled={loadingOdometro}
                />
                {lastOdometro !== null && (
                    <p className="text-sm text-gray-500 mt-1">
                        Último registro: {lastOdometro} (Ingrese igual o mayor)
                        <span className="block text-red-500">Ingrese un valor igual o mayor.</span>
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
                    onClick={() => validateStep3() && onNext()}
                    disabled={loadingPlacas || loadingOdometro}
                >
                    {loadingOdometro ? 'Validando...' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
}

export default StepTres;
