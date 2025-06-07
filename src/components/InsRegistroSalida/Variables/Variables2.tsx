import { useState } from 'react';
import { Llanta, CantidadLlantas } from '@/types/llantas';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';

function Variables2() {
  
  const [llantas, setLlantas] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');
  const [cantidadLlantas, setCantidadLlantas] = useState<CantidadLlantas>(4);

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

  // Función para actualizar llantas según cantidad de ruedas
  const actualizarLlantasPorPlaca = async (placa: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/placas/get-cantidad-llantas`);
      const cantidad = response.data[placa.toUpperCase()] || 4;
      setCantidadLlantas(cantidad as CantidadLlantas);
      
      let llantasFiltradas: Llanta[] = [];
      
      if (cantidad === 4) {
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id));
      } else if (cantidad === 6) {
        llantasFiltradas = todasLlantas.filter(llanta => [1, 2, 5, 6, 7, 8].includes(llanta.id));
      } else { // 10 llantas
        llantasFiltradas = [...todasLlantas];
      }
      
      setLlantas(llantasFiltradas);
    } catch (error) {
      console.error('Error al obtener cantidad de llantas:', error);
      setLlantas(todasLlantas.filter(llanta => [1, 2, 5, 7].includes(llanta.id)));
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

