import { useState } from 'react';
import { Llanta, CantidadLlantas } from '@/types/llantas';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';

function Variables2() {
  // Definición de todas las posibles llantas
  const todasLlantas: Llanta[] = [
    { id: 1, nombre: '1 - Delantera Izquierda', posicion: 'delantera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 2, nombre: '2 - Delantera Derecha', posicion: 'delantera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 3, nombre: '3 - Central Interna Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 4, nombre: '4 - Central Externa Derecha', posicion: 'central', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 5, nombre: '5 - Trasera Interna Derecha', posicion: 'trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 6, nombre: '6 - Trasera Externa Derecha', posicion: 'extra-trasera', lado: 'derecha', fp: false, pe: false, pa: false, desgaste: false },
    { id: 7, nombre: '7 - Trasera Interna Izquierda', posicion: 'trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 8, nombre: '8 - Trasera Externa Izquierda', posicion: 'extra-trasera', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 9, nombre: '9 - Central Interna Izquierda', posicion: 'central', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false },
    { id: 10, nombre: '10 - Central Externa Izquierda', posicion: 'central', lado: 'izquierda', fp: false, pe: false, pa: false, desgaste: false }
  ];

  // Estados
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');
  const [cantidadLlantas, setCantidadLlantas] = useState<CantidadLlantas>(4);

  // Función para actualizar las llantas según la placa
  const actualizarLlantasPorPlaca = async (placa: string) => {
    if (!placa) {
      // Si no hay placa, mostrar configuración por defecto (4 llantas)
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
      setCantidadLlantas(4);
      return;
    }

    try {
      // Obtener la cantidad de llantas desde el backend
      const response = await axios.get(`${BASE_URL}/placas/get-cantidad-llantas`);
      const cantidad = response.data[placa.toUpperCase()] || 4;
      
      // Validar que sea 4, 6 o 10
      const cantidadValida: CantidadLlantas = 
        cantidad === 4 || cantidad === 6 || cantidad === 10 ? cantidad : 4;
      
      setCantidadLlantas(cantidadValida);

      // Filtrar llantas según la cantidad
      let llantasFiltradas: Llanta[] = [];
      
      switch(cantidadValida) {
        case 4:
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
          break;
        case 6:
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id));
          break;
        case 10:
          llantasFiltradas = [...todasLlantas];
          break;
        default:
          llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
      }
      
      setLlantas(llantasFiltradas);
    } catch (error) {
      console.error('Error al obtener cantidad de llantas:', error);
      // Fallback a 4 llantas si hay error
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
      setCantidadLlantas(4);
    }
  };

  return {
    llantas,
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    cantidadLlantas,
    actualizarLlantasPorPlaca
  };
}

export default Variables2;
