import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // Definición completa de todas las llantas posibles (1-10)
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 3, nombre: '3 - Central Interna Derecha', posicion: 'central', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 4, nombre: '4 - Central Externa Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera o Trasera Interna - Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Trasera Externa Derecha', posicion: 'extra', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera o Trasera Interna - Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Trasera Externa Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 9, nombre: '9 - Central Interna Izquierda', posicion: 'refuerzo', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 10, nombre: '10 - Central Externa Izquierda', posicion: 'refuerzo', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false }
  ];

  // Estado para las llantas seleccionadas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para actualizar llantas según cantidad (4, 6 o 10)
  const actualizarLlantasPorCantidad = (cantidad: number) => {
    let llantasSeleccionadas: Llanta[] = [];
    
    switch(cantidad) {
      case 4:
        llantasSeleccionadas = todasLlantas.filter(llanta => 
          [1, 2, 5, 7].includes(llanta.id)
        );
        break;
      case 6:
        llantasSeleccionadas = todasLlantas.filter(llanta => 
          [1, 2, 5, 6, 7, 8].includes(llanta.id)
        );
        break;
      case 10:
        llantasSeleccionadas = [...todasLlantas]; // Todas las llantas
        break;
      default:
        // Por defecto 4 llantas si no se especifica o hay error
        llantasSeleccionadas = todasLlantas.filter(llanta => 
          [1, 2, 5, 7].includes(llanta.id)
        );
    }

    // Resetear los estados de las llantas seleccionadas
    llantasSeleccionadas = llantasSeleccionadas.map(llanta => ({
      ...llanta,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false
    }));

    setLlantas(llantasSeleccionadas);
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorCantidad // Nueva función que reemplaza a actualizarLlantasPorTipo
  };
}

export default Variables2;
