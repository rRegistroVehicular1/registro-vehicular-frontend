import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';

function Variables1() {
  const [placa, setPlaca] = useState('');
  const [conductor, setConductor] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [odometroSalida, setOdometroSalida] = useState('');
  const [odometroLlegada, setOdometroLlegada] = useState('');
  const [step, setStep] = useState(1);
  const [datos, setDatos] = useState([]);
  const [cantidadLlantasMap, setCantidadLlantasMap] = useState<Record<string, number>>({});

  // Nueva función para obtener el mapeo de placas a cantidad de llantas
  const fetchCantidadLlantas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/placas/get-cantidad-llantas`);
      setCantidadLlantasMap(response.data);
    } catch (error) {
      console.error('Error al obtener cantidad de llantas:', error);
      setCantidadLlantasMap({});
    }
  };

  // Función para obtener la cantidad de llantas de la placa actual
  const getCantidadLlantas = (): number => {
    if (!placa || !cantidadLlantasMap[placa]) {
      return 4; // Valor por defecto si no hay información
    }
    return cantidadLlantasMap[placa];
  };

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    fetchCantidadLlantas();
  }, []);

  return {
    placa, 
    setPlaca,
    conductor,
    setConductor,
    sucursal,
    setSucursal,
    tipoVehiculo,
    setTipoVehiculo,
    fecha,
    setFecha,
    horaSalida,
    setHoraSalida,
    horaEntrada,
    setHoraEntrada,
    odometroSalida,
    setOdometroSalida,
    odometroLlegada,
    setOdometroLlegada,
    step,
    setStep,
    datos,
    setDatos,
    cantidadLlantasMap,
    getCantidadLlantas, // Nueva función expuesta
    fetchCantidadLlantas // Para recargar datos si es necesario
  };
}

export default Variables1;
