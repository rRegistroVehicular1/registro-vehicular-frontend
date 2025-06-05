import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // 1. Definir llantasBase como constante primero
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Extra Trasera Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Extra Trasera Derecha', posicion: 'extra', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false }
  ]

  // Estado unificado para todas las llantas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  //const [observacionGeneral, setObservacionGeneral] = useState('');
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para actualizar llantas según cantidad de llantas
  const actualizarLlantasPorTipo = (tipoVehiculo: string, cantidadLlantas: number = 4) => {
      let llantasFiltradas: Llanta[] = [];
      
      if (cantidadLlantas === 4) {
          llantasFiltradas = todasLlantas.filter(llanta => 
              [1, 2, 5, 7].includes(llanta.id)
          );
      } else if (cantidadLlantas === 6) {
          llantasFiltradas = todasLlantas.filter(llanta => 
              [1, 2, 5, 6, 7, 8].includes(llanta.id)
          );
      } else if (cantidadLlantas === 10) {
          llantasFiltradas = todasLlantas.filter(llanta => 
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(llanta.id)
          );
      } else {
          // Default a 4 llantas si el número no coincide
          llantasFiltradas = todasLlantas.filter(llanta => 
              [1, 2, 5, 7].includes(llanta.id)
          );
      }
      
      setLlantas(llantasFiltradas);
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorTipo
  };
}

export default Variables2;
