import { useState } from 'react';

function Variables1 (){

  const [placa, setPlaca] = useState('');
  const [conductor, setConductor] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [odometroSalida, setOdometroSalida] = useState('');
  const [odometroLlegada, setOdometroLlegada] = useState('');
  const [step, setStep] = useState(2);
  const [datos, setDatos] = useState([]);

  return {placa, setPlaca, conductor, setConductor, sucursal, setSucursal,
    tipoVehiculo, setTipoVehiculo, fecha, setFecha, horaSalida, setHoraSalida,
    horaEntrada, setHoraEntrada, odometroSalida, setOdometroSalida, odometroLlegada,setOdometroLlegada, step, setStep, datos, setDatos
  };
};

export default Variables1;
