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
    actualizarLlantasPorCantidad: (cantidad: number) => void;
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
    actualizarLlantasPorCantidad
}: Step3Props) {
    
    const [placasList, setPlacasList] = useState<string[]>([]);
    const [loadingPlacas, setLoadingPlacas] = useState(true);
    const [loadingOdometro, setLoadingOdometro] = useState(false);
    const [lastOdometro, setLastOdometro] = useState<number | null>(null);
    const [vehiculosMap, setVehiculosMap] = useState<Record<string, string>>({});
    const [conductoresList, setConductoresList] = useState<string[]>([]);
    const [loadingConductores, setLoadingConductores] = useState(true);
    const [llantasPorPlaca, setLlantasPorPlaca] = useState<Record<string, number>>({});
    const [showCustomConductor, setShowCustomConductor] = useState(false);
    const [customConductor, setCustomConductor] = useState('');
    
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

        // Buscar y seleccionar la placa almacenada si existe
        const storedPlaca = localStorage.getItem('currentPlaca');
        if (storedPlaca && placas.includes(storedPlaca)) {
          setPlaca(storedPlaca);
          fetchLastOdometro(storedPlaca);
          
          // Actualizar llantas basado en la placa seleccionada
          const cantidadLlantas = llantasPorPlaca[storedPlaca] || 4;
          actualizarLlantasPorCantidad(cantidadLlantas);
          
          // Mantener lógica existente para tipo de vehículo
          if (vehiculosMap[storedPlaca]) {
            setTipoVehiculo(vehiculosMap[storedPlaca].toLowerCase());
          }
        }
      } catch (error) {
        console.error('Error al obtener placas:', error);
        setPlacasList([]);
        alert('Error al cargar las placas disponibles');
      } finally {
        setLoadingPlacas(false);
        // Limpiar la placa almacenada después de usarla
        localStorage.removeItem('currentPlaca');
      }
    };

    const fetchTiposVehiculo = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/placas/get-tipos-vehiculo`);
            setVehiculosMap(response.data);
        } catch (error) {
            console.error('Error al obtener tipos de vehículo:', error);
        }
    }

    const fetchLlantasPorPlaca = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/placas/get-llantas-por-placa`);
            setLlantasPorPlaca(response.data);
        } catch (error) {
            console.error('Error al obtener llantas por placa:', error);
            setLlantasPorPlaca({});
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

    const fetchConductores = async () => {
        setLoadingConductores(true);
        try {
            const response = await axios.get(`${BASE_URL}/placas/get-conductores`);
            
            if (!response.data || !Array.isArray(response.data)) {
                throw new Error('Formato de respuesta inválido');
            }
            
            setConductoresList(response.data.sort());
        } catch (error) {
            console.error('Error al obtener conductores:', error);
            setConductoresList([]);
        } finally {
            setLoadingConductores(false);
        }
    };

    useEffect(() => {
        fetchConductores();
        fetchLlantasPorPlaca();
    }, []);
    
    useEffect(() => {
        fetchPlacas();
        fetchTiposVehiculo();
    }, []);

    useEffect(() => {
        if (placa) {
            fetchLastOdometro(placa);
            
            // Actualizar llantas basado en la placa seleccionada
            const cantidadLlantas = llantasPorPlaca[placa] || 4;
            actualizarLlantasPorCantidad(cantidadLlantas);
            
            // Mantener lógica existente para tipo de vehículo
            if (vehiculosMap[placa]) {
                const tipo = vehiculosMap[placa].toLowerCase();
                setTipoVehiculo(tipo);
            } else {
                setTipoVehiculo(''); // Limpiar si no se encuentra
            }
        } else {
            setLastOdometro(null);
        }
    }, [placa, llantasPorPlaca]);

    useEffect(() => {
        if (odometroSalida && lastOdometro !== null) {
            const currentValue = Number(odometroSalida);
            if (!isNaN(currentValue) && currentValue < lastOdometro) {
                console.log(`Advertencia: Odómetro actual (${currentValue}) es menor que el último registro (${lastOdometro})`);
            }
        }
    }, [odometroSalida, lastOdometro]);

    const validateStep3 = () => {
        if (!placa || !tipoVehiculo || !odometroSalida) {
            alert("Todos los campos son obligatorios");
            return false;
        }

        if (!conductor && !(showCustomConductor && customConductor)) {
            alert("Debe seleccionar un conductor o ingresar un nombre");
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

        console.log(`placa: ${placa} - conductor: ${conductor || customConductor} - tipoVehiculo: ${tipoVehiculo} - odometroSalida: ${odometroSalida}`)

        return true;
    };

    const handleConductorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "other") {
            setShowCustomConductor(true);
            setConductor("");
        } else {
            setShowCustomConductor(false);
            setCustomConductor("");
            setConductor(value);
        }
    };

    const handleNext = () => {
        if (validateStep3()) {
            // Si hay un conductor personalizado, usarlo
            if (showCustomConductor && customConductor) {
                setConductor(customConductor);
            }
            onNext();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block mb-4">
                Placa del Vehículo:
                <select
                    value={placa}
                    onChange={(e) => {
                        console.log("Placa seleccionada en onChange:", e.target.value);
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
                <div className="flex flex-col">
                    <select
                        value={showCustomConductor ? "other" : conductor}
                        onChange={handleConductorChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                        disabled={loadingConductores}
                    >
                        {loadingConductores ? (
                            <option value="">Cargando conductores...</option>
                        ) : conductoresList.length === 0 ? (
                            <option value="" disabled>No hay conductores registrados</option>
                        ) : (
                            <>
                                <option value="">Seleccione un conductor</option>
                                {conductoresList.map((conductorItem, index) => (
                                    <option key={`${conductorItem}-${index}`} value={conductorItem}>
                                        {conductorItem}
                                    </option>
                                ))}
                                <option value="other">Otro (ingresar nombre)</option>
                            </>
                        )}
                    </select>
                    
                    {showCustomConductor && (
                        <input
                            type="text"
                            value={customConductor}
                            onChange={(e) => setCustomConductor(e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
                            placeholder="Ingrese el nombre del conductor"
                            required
                        />
                    )}
                </div>
            </label>

            <label className="block mb-4">
                Tipo de Vehículo:
                <select
                    value={tipoVehiculo}
                    onChange={(e) => setTipoVehiculo(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="sedan">SEDAN</option>
                    <option value="pickup">PICKUP</option>
                    <option value="panel">PANEL</option>
                    <option value="camion">CAMION</option>
                    <option value="cabezal">CABEZAL</option>
                    <option value="orca">ORCA</option>
                </select>
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
                    onClick={handleNext}
                    disabled={loadingPlacas || loadingOdometro}
                >
                    {loadingOdometro ? 'Validando...' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
}

export default StepTres;
