// components/InsRegistroSalida/Variables/Variables2.tsx
import { useState } from 'react';
import { Llanta } from '@/types/llantas';

// 1. Definir llantasBase como constante primero
const llantasBase = {
    camion: [
        { id: 1, nombre: 'Delantera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
        { id: 2, nombre: 'Delantera Derecha', fp: false, pe: false, pa: false, desgaste: false },
        { id: 5, nombre: 'Trasera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
        { id: 6, nombre: 'Extra Trasera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
        { id: 7, nombre: 'Trasera Derecha', fp: false, pe: false, pa: false, desgaste: false },
        { id: 8, nombre: 'Extra Trasera Derecha', fp: false, pe: false, pa: false, desgaste: false }
    ],
    otros: [
        { id: 1, nombre: 'Delantera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
        { id: 2, nombre: 'Delantera Derecha', fp: false, pe: false, pa: false, desgaste: false },
        { id: 5, nombre: 'Trasera Izquierda', fp: false, pe: false, pa: false, desgaste: false },
        { id: 7, nombre: 'Trasera Derecha', fp: false, pe: false, pa: false, desgaste: false }
    ]
};

function Variables2() {
  // 2. Inicializar estados usando llantasBase
  const [tipoVehiculo, setTipoVehiculo] = useState<string>('');
  const [llantasParte1, setLlantasParte1] = useState<Llanta[]>([]);
  const [llantasParte2, setLlantasParte2] = useState<Llanta[]>([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // 3. Definir la función una sola vez con tipos explícitos
  const actualizarLlantasPorTipo = (tipo: string) => {
        setTipoVehiculo(tipo);
        const config = tipo === 'camion' ? llantasBase.camion : llantasBase.otros;
        
        // Para camión: parte1 = 4 llantas, parte2 = 2 llantas
        if (tipo === 'camion') {
            setLlantasParte1(config.slice(0, 4)); // Llantas 1,2,5,6
            setLlantasParte2(config.slice(4));    // Llantas 7,8
        } else {
            // Para otros: parte1 = 2 llantas, parte2 = 2 llantas
            setLlantasParte1(config.slice(0, 2)); // Llantas 1,2
            setLlantasParte2(config.slice(2));    // Llantas 5,7
        }
    };

  return {
      llantasParte1,
      setLlantasParte1,
      llantasParte2,
      setLlantasParte2,
      observacionGeneralLlantas,
      setObservacionGeneralLlantas,
      actualizarLlantasPorTipo,
      tipoVehiculo
  };
}

export default Variables2;
