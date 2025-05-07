// components/InsRegistroSalida/Variables/Variables2.tsx
import { useState } from 'react';

export interface Llanta {
  id: number;
  nombre: string;
  fp: boolean;
  pe: boolean;
  pa: boolean;
  desgaste: boolean;
}

function Variables2() {
  // Estado base de todas las llantas posibles
  const [llantasBase] = useState<Llanta[]([
    { id: 1, nombre: 'Llanta Delantera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: 'Llanta Delantera Derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: 'Llanta Trasera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: 'Llanta Trasera Derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: 'Llanta Extra Trasera Izquierda (Solo Camión)', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: 'Llanta Extra Trasera Derecha (Solo Camión)', fp: false, pe: false, pa: false, desgaste: false }
  ]);

  const [llantasParte1, setLlantasParte1] = useState(llantasBase.slice(0, 2)); // Default: sedan/pickup/panel
  const [llantasParte2, setLlantasParte2] = useState(llantasBase.slice(2, 4)); // Default: sedan/pickup/panel
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  const actualizarLlantasPorTipo = (tipoVehiculo: string): void => {
    if (tipoVehiculo === 'camion') {
      setLlantasParte1(llantasBase.filter(llanta => [1, 2, 5, 6].includes(llanta.id)));
      setLlantasParte2(llantasBase.filter(llanta => [7, 8].includes(llanta.id)));
    } else {
      setLlantasParte1(llantasBase.filter(llanta => [1, 2].includes(llanta.id)));
      setLlantasParte2(llantasBase.filter(llanta => [5, 7].includes(llanta.id)));
    }
  };

  return {
    llantasParte1, 
    setLlantasParte1: setLlantasParte1 as (llantas: Llanta[]) => void,
    llantasParte2, 
    setLlantasParte2: setLlantasParte2 as (llantas: Llanta[]) => void,
    observacionGeneralLlantas, 
    setObservacionGeneralLlantas,
    actualizarLlantasPorTipo
  };
}

export default Variables2;
