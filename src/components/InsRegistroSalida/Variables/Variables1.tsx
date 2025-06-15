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
  const [cantidadLlantas, setCantidadLlantas] = useState(4); // Valor por defecto
  const actualizarLlantasPorCantidad = (cantidad: number) => {
    // Esta función será reemplazada por la de Variables2
    console.log(`Cantidad de llantas: ${cantidad}`);
  };

  // Nueva función para obtener la cantidad de llantas
  const fetchCantidadLlantas = async (placa: string) => {
    if (!placa) return;
    
    try {
      const response = await axios.get(`${BASE_URL}/placas/get-tipos-vehiculo`);
      const { llantas } = response.data;
      const cantidad = llantas[placa] || 4; // Default a 4 si no se encuentra
      setCantidadLlantas(cantidad);
    } catch (error) {
      console.error('Error al obtener cantidad de llantas:', error);
      setCantidadLlantas(4); // Default a 4 en caso de error
    }
  };

  // Actualizar cantidad de llantas cuando cambia la placa
  useEffect(() => {
    if (placa) {
      fetchCantidadLlantas(placa);
    } else {
      setCantidadLlantas(4); // Reset a valor por defecto
    }
  }, [placa]);

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
    cantidadLlantas // Exportar la cantidad de llantas
  };
}

export default Variables1;
