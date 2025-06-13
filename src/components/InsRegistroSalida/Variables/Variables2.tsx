import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // 1. Definir llantasBase como constante primero
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera o Trasera Interna Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Trasera Externa Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera o Trasera Interna Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Trasera Externa Derecha', posicion: 'extra', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 3, nombre: '3 - Central Interna Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 4, nombre: '4 - Central Externa Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 9, nombre: '9 - Central Interna Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 10, nombre: '10 - Central Externa Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false }
  ]

  // Estado unificado para todas las llantas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  //const [observacionGeneral, setObservacionGeneral] = useState('');
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Mapeo de cantidad de llantas a los IDs permitidos
  const llantasPorCantidad: Record<number, number[]> = {
    4: [1, 2, 5, 7],       // Para vehículos con 4 llantas 
    6: [1, 2, 5, 6, 7, 8],  // Para vehículos con 6 llantas 
    10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Para vehículos con 10 llantas 
  };

  // Función para actualizar llantas según cantidad de llantas
  const actualizarLlantasPorTipo = (cantidadLlantas: number) => {
    if (!llantasPorCantidad[cantidadLlantas]) {
      throw new Error(`Cantidad de llantas no soportada: ${cantidadLlantas}`);
    }
    
    setLlantas(todasLlantas.filter(llanta => 
      llantasPorCantidad[cantidadLlantas].includes(llanta.id)));
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
