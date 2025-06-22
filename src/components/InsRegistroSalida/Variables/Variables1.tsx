import { useState } from 'react';

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
  const [cantidadLlantas, setCantidadLlantas] = useState<number>(4); // Nuevo estado para cantidad de llantas

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
    cantidadLlantas, // Nuevo valor exportado
    setCantidadLlantas // Nueva función exportada
  };
}

export default Variables1;
