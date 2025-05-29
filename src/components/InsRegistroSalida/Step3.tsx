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
    const [placasMap, setPlacasMap] = useState<Record<string, string>>({});

    const fetchPlacas = async () => {
      setLoadingPlacas(true);
      try {
        const response = await axios.get(`${BASE_URL}/placas/get-data-placas`);
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Formato de respuesta inválido');
        }
    
        const placasResponse = await axios.get(`${BASE_URL}/placas/get-vehiculos`);
        if (placasResponse.data) {
          setPlacasMap(placasResponse.data);
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

    // Función para manejar el cambio de placa
    const handlePlacaChange = (selectedPlaca: string) => {
        setPlaca(selectedPlaca);
        
        // Buscar el tipo de vehículo correspondiente a la placa seleccionada
        if (placasMap[selectedPlaca]) {
            const tipo = placasMap[selectedPlaca].toLowerCase();
            setTipoVehiculo(tipo);
            actualizarLlantasPorTipo(tipo);
        } else {
            setTipoVehiculo(''); // Limpiar si no se encuentra
        }
        
        // Lógica existente para obtener odómetro
        fetchLastOdometro(selectedPlaca);
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
        fetchPlacas();
    }, []);

    useEffect(() => {
        if (placa) {
            fetchLastOdometro(placa);
        } else {
        setLastOdometro(null);
        }
    }, [placa]);

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
                    onChange={(e) => handleTipoVehiculoChange(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                    readOnly // Hacemos el campo de solo lectura ya que se autocompleta
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

