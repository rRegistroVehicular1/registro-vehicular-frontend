import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // Definimos todas las posibles llantas (para 4, 6 y 10 llantas)
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
  
  // Estado para la observación general de llantas
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para actualizar llantas según la cantidad
  const actualizarLlantasPorCantidad = (cantidad: number) => {
    let llantasFiltradas: Llanta[] = [];
    
    // Seleccionamos las llantas según la cantidad
    switch(cantidad) {
      case 4:
        // Vehículos con 4 llantas: 1, 2, 5, 7
        llantasFiltradas = todasLlantas.filter(llanta => 
          [1, 2, 5, 7].includes(llanta.id)
        );
        break;
      case 6:
        // Vehículos con 6 llantas: 1, 2, 5, 6, 7, 8
        llantasFiltradas = todasLlantas.filter(llanta => 
          [1, 2, 5, 6, 7, 8].includes(llanta.id)
        );
        break;
      case 10:
        // Vehículos con 10 llantas: todas
        llantasFiltradas = [...todasLlantas];
        break;
      default:
        // Por defecto, 4 llantas
        llantasFiltradas = todasLlantas.filter(llanta => 
          [1, 2, 5, 7].includes(llanta.id)
        );
    }
    
    // Reiniciamos los estados de las llantas
    llantasFiltradas = llantasFiltradas.map(llanta => ({
      ...llanta,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false
    }));
    
    setLlantas(llantasFiltradas);
  };

  // Función para mantener compatibilidad con el código existente (opcional)
  const actualizarLlantasPorTipo = (tipoVehiculo: string) => {
    // Esta función se mantiene por compatibilidad pero ahora usa cantidad fija
    // Puedes eliminarla si estás seguro que no se usa en otros lugares
    const cantidad = tipoVehiculo === 'camion' ? 6 : 4;
    actualizarLlantasPorCantidad(cantidad);
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorCantidad,
    actualizarLlantasPorTipo // Se mantiene por compatibilidad
  };
}

export default Variables2;
