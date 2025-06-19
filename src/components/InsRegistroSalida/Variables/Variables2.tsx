import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // Definir todas las llantas posibles (4, 6 y 10 llantas)
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
    let llantasFiltradas: Llanta[] = [];
    
    switch(cantidad) {
      case 4:
        // 4 llantas: 1, 2, 5, 7
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
        break;
      case 6:
        // 6 llantas: 1, 2, 5, 6, 7, 8
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id));
        break;
      case 10:
        // 10 llantas: todas
        llantasFiltradas = [...todasLlantas];
        break;
      default:
        // Por defecto 4 llantas
        console.warn(`Cantidad de llantas no reconocida: ${cantidad}. Usando 4 llantas por defecto.`);
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
    }
    
    // Ordenar las llantas por ID para mantener consistencia
    llantasFiltradas.sort((a, b) => a.id - b.id);
    
    // Reiniciar los estados de las llantas
    const llantasReseteadas = llantasFiltradas.map(llanta => ({
      ...llanta,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false
    }));
    
    setLlantas(llantasReseteadas);
  };

  // Función para manejar cambios en las llantas (opcional, si se necesita)
  const handleLlantasChange = (nuevasLlantas: Llanta[]) => {
    setLlantas(nuevasLlantas);
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorCantidad,
    handleLlantasChange // Opcional, según necesidad
  };
}

export default Variables2;
