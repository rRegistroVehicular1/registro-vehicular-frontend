import { useState } from 'react';

function Variables2() {

  const getInitialLlantas = (tipoVehiculo: string) => {
    const isCamion = tipoVehiculo === 'camion';

    const parte1 = [
      { id: 1, fp: false, pe: false, pa: false, desgaste: false },
      { id: 2, fp: false, pe: false, pa: false, desgaste: false }, 
      { id: 5, fp: false, pe: false, pa: false, desgaste: false }, 
      ...(isCamion ? [{ id: 6, fp: false, pe: false, pa: false, desgaste: false },]: []),];
    
    const parte2 = [
      { id: 7, fp: false, pe: false, pa: false, desgaste: false },
      ...(isCamion? [{ id: 8, fp: false, pe: false, pa: false, desgaste: false },]: []),];

    return { parte1, parte2 };
  };

  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [llantasParte1, setLlantasParte1] = useState([]);
  const [llantasParte2, setLlantasParte2] = useState([]);
  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  // Función para inicializar llantas cuando se selecciona el tipo
  const initializeLlantas = (tipo: string) => {
    const { parte1, parte2 } = getInitialLlantas(tipo);
    setLlantasParte1(parte1);
    setLlantasParte2(parte2);
    setTipoVehiculo(tipo);
  };

  


  /*const [llantasParte1, setLlantasParte1] = useState(
    Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false }).map((_, index) => ({
      id: index + 1,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false,
    }))
  );

  const [llantasParte2, setLlantasParte2] = useState(
    Array(5).fill({ id: 0, fp: false, pe: false, pa: false, desgaste: false }).map((_, index) => ({
      id: index + 6,
      fp: false,
      pe: false,
      pa: false,
      desgaste: false,
    }))
  );*/

  return {
    llantasParte1, setLlantasParte1, llantasParte2, setLlantasParte2, tipoVehiculo, setTipoVehiculo: initializeLlantas, observacionGeneralLlantas, setObservacionGeneralLlantas
  }
};

export default Variables2;
