import { useState } from 'react';
import { Llanta } from '@/types/llantas';

function Variables2() {
  // 1. Definir llantasBase como constante primero
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 3, nombre: '3 - Trasera (Central) Interna Derecha', posicion: 'extra-delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 4, nombre: '4 - Trasera (Central) Externa Derecha', posicion: 'extra-delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera Interna Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Trasera Externa Derecha', posicion: 'extra-trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera Interna Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Trasera Externa Izquierda', posicion: 'extra-trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 9, nombre: '9 - Trasera (Central) Interna Izquierda', posicion: 'central', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 10, nombre: '10 - Trasera (Central) Externa Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false }
  ];

  // Estado unificado para todas las llantas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para actualizar llantas según cantidad de llantas
  const actualizarLlantasPorTipo = (tipoVehiculo: string, cantidadLlantas: number) => {
      let llantasFiltradas: Llanta[] = [];
      
      // Primero filtramos por cantidad de llantas
      switch(cantidadLlantas) {
        case 4:
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
          break;
        case 6:
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id));
          break;
        case 10:
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(llanta.id));
          break;
        default:
          // Por defecto mostramos 4 llantas si el número no coincide
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
      }
  
      // Opcional: ajustes adicionales basados en el tipo de vehículo
      if (tipoVehiculo === 'camion') {
        // Podemos hacer ajustes específicos para camiones si es necesario
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
