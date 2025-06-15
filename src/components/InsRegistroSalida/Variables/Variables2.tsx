import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // Definición de todas las llantas posibles (para 4, 6 y 10 llantas)
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

  // Estado para las llantas seleccionadas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para actualizar llantas según la cantidad
  const actualizarLlantasPorCantidad = (cantidad: number) => {
    let llantasSeleccionadas: Llanta[] = [];
    
    switch(cantidad) {
      case 4:
        // Para 4 llantas: Delanteras (1,2) y Traseras (5,7)
        llantasSeleccionadas = todasLlantas.filter(llanta => 
          [1, 2, 5, 7].includes(llanta.id)
        );
        break;
        
      case 6:
        // Para 6 llantas: Delanteras (1,2), Traseras (5,7) y Extras (6,8)
        llantasSeleccionadas = todasLlantas.filter(llanta => 
          [1, 2, 5, 6, 7, 8].includes(llanta.id)
        );
        break;
        
      case 10:
        // Para 10 llantas: Todas las llantas
        llantasSeleccionadas = [...todasLlantas];
        break;
        
      default:
        // Por defecto (si no es 4,6 o 10) usar 4 llantas
        llantasSeleccionadas = todasLlantas.filter(llanta => 
          [1, 2, 5, 7].includes(llanta.id)
        );
    }
    
    setLlantas(llantasSeleccionadas);
  };

  // Función para actualizar el estado de una llanta específica
  const actualizarLlanta = (id: number, cambios: Partial<Llanta>) => {
    setLlantas(prevLlantas => 
      prevLlantas.map(llanta => 
        llanta.id === id ? { ...llanta, ...cambios } : llanta
      )
    );
  };

  return {
    llantas,
    setLlantas,
    actualizarLlanta,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorCantidad  // Exportamos la nueva función
  };
}

export default Variables2;
