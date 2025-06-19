import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // 1. Definir todas las llantas posibles (10 posiciones)
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

  // Función para actualizar llantas según cantidad (4, 6 o 10)
  const actualizarLlantasPorCantidad = (cantidad: number) => {
    let llantasIds: number[] = [];
    
    switch(cantidad) {
      case 4:
        llantasIds = [1, 2, 5, 7]; // Delanteras + traseras básicas
        break;
      case 6:
        llantasIds = [1, 2, 5, 6, 7, 8]; // Delanteras + traseras + extras traseras
        break;
      case 10:
        llantasIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Todas las llantas
        break;
      default:
        llantasIds = [1, 2, 5, 7]; // Default a 4 llantas
    }
    
    // Filtrar las llantas según los IDs permitidos
    const llantasFiltradas = todasLlantas.filter(llanta => 
      llantasIds.includes(llanta.id)
    );
    
    setLlantas(llantasFiltradas);
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorCantidad, // Exportar la nueva función
    todasLlantas // Exportar para referencia si es necesario
  };
}

export default Variables2;
