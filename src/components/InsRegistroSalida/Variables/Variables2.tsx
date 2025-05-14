import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // 1. Definir llantasBase como constante primero
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: 'Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: 'Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: 'Trasera Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: 'Extra Trasera Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: 'Trasera Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: 'Extra Trasera Derecha', posicion: 'extra', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false }
  ]

  // Estado unificado para todas las llantas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneral, setObservacionGeneral] = useState('');
  //const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para actualizar llantas según tipo de vehículo
  const actualizarLlantasPorTipo = (tipoVehiculo: string) => {
    if (tipoVehiculo === 'camion') {
      setLlantas(todasLlantas.filter(llanta => 
        [1, 2, 5, 6, 7, 8].includes(llanta.id)
      ));
    } else {
      setLlantas(todasLlantas.filter(llanta => 
        [1, 2, 5, 7].includes(llanta.id)
      ));
    }
  };

  return {
    llantas,
    setLlantas,
    observacionGeneral,
    setObservacionGeneral,
    actualizarLlantasPorTipo
  };
}

export default Variables2;
