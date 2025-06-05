import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // 1. Definir llantasBase como constante primero
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 3, nombre: '3 - Extra Delantera Izquierda', posicion: 'extra-delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 4, nombre: '4 - Extra Delantera Derecha', posicion: 'extra-delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Extra Trasera Derecha', posicion: 'extra-trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Extra Trasera Izquierda', posicion: 'extra-trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 9, nombre: '9 - Central Izquierda', posicion: 'central', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 10, nombre: '10 - Central Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false }
  ];

  // Estado unificado para todas las llantas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  const actualizarLlantasPorTipo = (tipo: string) => {
    // Lógica original para compatibilidad
    if (tipo === 'camion') {
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id)));
    } else {
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
    }
  };
  
  // Función para actualizar llantas según tipo de vehículo
  const actualizarLlantasPorCantidad = (cantidad: number) => {
    let llantasFiltradas: Llanta[] = [];
    
    switch(cantidad) {
      case 4:
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
        break;
      case 6:
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id));
        break;
      case 10:
        llantasFiltradas = todasLlantas;
        break;
      default:
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
    }
    
    setLlantas(llantasFiltradas);
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorTipo,
    actualizarLlantasPorCantidad
  };
}

export default Variables2;
