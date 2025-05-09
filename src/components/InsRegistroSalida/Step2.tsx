import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';


// components/InsRegistroSalida/Step2.tsx
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

function StepDos({ placa, setPlaca, conductor, setConductor, tipoVehiculo, setTipoVehiculo, odometroSalida, setOdometroSalida, onPrevious, onNext, datos, actualizarLlantasPorTipo}: Step2Props) {
    
    const [placasList, setPlacasList] = useState<string[]>([]);
    
    console.log('Datos recibidos en Step2:', datos);
    
    const [lastOdometro, setLastOdometro] = useState<number | null>(null);
    
    const fetchLastOdometro = async (selectedPlaca: string) => {
      try {
        const response = await axios.get(`${BASE_URL}/ins-registro-entrada/last-odometro`, {
          params: { placa: selectedPlaca }
        });
        setLastOdometro(response.data.lastOdometro);
      } catch (error) {
        console.error('Error al obtener último odómetro:', error);
        setLastOdometro(null);
      }
    };
    
    useEffect(() => {
      const fetchPlacas = async () => {
        try {
          console.log("Iniciando carga de placas...");
          const response = await axios.get(`${BASE_URL}/placas/get-data-placas`);
          console.log("Respuesta del servidor:", response.data);
          
          if (Array.isArray(response.data)) {
            setPlacasList(response.data);
            console.log("Placas cargadas:", response.data);
          } else {
            console.error("La respuesta no es un array:", response.data);
            setPlacasList([]);
          }
        } catch (error) {
          console.error("Error al obtener placas:", error);
          setPlacasList([]);
        }
      };

      fetchPlacas();
    }, []);
    
    const validateStep2 = () => {
        if (!placa || !conductor || !tipoVehiculo || !odometroSalida) {
            alert('Todos los campos de este paso son obligatorios.');
            return false;
        }
        if (lastOdometro !== null && parseFloat(odometroSalida) <= lastOdometro) {
            alert(`El odómetro debe ser mayor al último registrado (${lastOdometro})`);
            return false;
        }
        
        return true;
    };

    const handleTipoVehiculoChange = (value: string) => {
        setTipoVehiculo(value);
        actualizarLlantasPorTipo(value); // Actualiza las llantas al cambiar el tipo
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block mb-4">
                Placa del Vehículo:
                <select
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                  required
                >
                    <option value="">Seleccione una placa</option>
                  {placasList.map((placaItem, index) => (
                    <option key={index} value={placaItem}>
                      {placaItem}
                    </option>
                  ))}
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
                    min={lastOdometro ? lastOdometro + 1 : 0}
                    value={odometroSalida}
                    onChange={(e) => setOdometroSalida(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                />
                {lastOdometro !== null && (
                    <p className="text-sm text-gray-500 mt-1">
                      Último odómetro registrado: {lastOdometro}
                    </p>
                )}
            </label>

            <div className="col-span-1 md:col-span-2 flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onPrevious}>
                    Atrás
                </button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                    if (validateStep2()) {
                        onNext();
                    }
                }}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default StepDos;
