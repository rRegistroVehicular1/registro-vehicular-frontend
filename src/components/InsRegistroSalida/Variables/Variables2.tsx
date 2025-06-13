import { useState } from 'react';
import { Llanta } from '@/types/llantas';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';

function Variables2() {
  // Definición de todas las llantas posibles (1-10)
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 3, nombre: '3 - Central Interna Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 4, nombre: '4 - Central Externa Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera o Trasera Interna Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Trasera Externa Derecha', posicion: 'extra', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera o Trasera Interna Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Trasera Externa Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 9, nombre: '9 - Central Interna Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 10, nombre: '10 - Central Externa Izquierda', posicion: 'extra', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false }
  ];

  // Estado para las llantas seleccionadas
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  
  // Estado para observaciones generales
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');
  
  // Estado para la cantidad de llantas (4, 6 o 10)
  const [cantidadLlantas, setCantidadLlantas] = useState<number>(4);

  // Función para actualizar llantas según la placa
  const actualizarLlantasPorPlaca = async (placa: string) => {
    if (!placa) {
      // Si no hay placa, mostrar 4 llantas por defecto
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
      setCantidadLlantas(4);
      return;
    }

    try {
      // Obtener el mapeo de placas a cantidad de llantas del backend
      const response = await axios.get(`${BASE_URL}/placas/get-cantidad-llantas`);
      const cantidad = response.data[placa.toUpperCase()] || 4; // Default a 4 si no se encuentra
      
      setCantidadLlantas(cantidad);
      
      // Determinar qué llantas mostrar según la cantidad
      let idsLlantas: number[] = [];
      
      switch (cantidad) {
        case 4:
          idsLlantas = [1, 2, 5, 7]; // Delanteras + Traseras básicas
          break;
        case 6:
          idsLlantas = [1, 2, 5, 6, 7, 8]; // Delanteras + Traseras + Extras traseras
          break;
        case 10:
          idsLlantas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Todas las llantas
          break;
        default:
          idsLlantas = [1, 2, 5, 7]; // Default a 4 llantas
      }
      
      // Filtrar las llantas basándose en los IDs, no en el índice
      const llantasFiltradas = todasLlantas.filter(llanta => 
        idsLlantas.includes(llanta.id)
      );
      
      setLlantas(llantasFiltradas);
    } catch (error) {
      console.error('Error al obtener cantidad de llantas:', error);
      // En caso de error, mostrar 4 llantas por defecto
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
      setCantidadLlantas(4);
    }
  };

  // Función para actualizar llantas según tipo de vehículo (mantenida por compatibilidad)
  const actualizarLlantasPorTipo = (tipoVehiculo: string) => {
    // Esta función se mantiene por compatibilidad con código existente
    // Pero ahora la lógica principal está en actualizarLlantasPorPlaca
    if (tipoVehiculo === 'camion') {
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id)));
      setCantidadLlantas(6);
    } else {
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
      setCantidadLlantas(4);
    }
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    actualizarLlantasPorPlaca, // Nueva función principal
    actualizarLlantasPorTipo,  // Mantenida por compatibilidad
    cantidadLlantas            // Nueva propiedad
  };
}

export default Variables2;
