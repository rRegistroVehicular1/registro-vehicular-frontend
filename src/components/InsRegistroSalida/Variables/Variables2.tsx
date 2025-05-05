import { useState } from 'react';

//prueba
function Variables2() {

  const [llantasParte1, setLlantasParte1] = useState(
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
  );

  const [observacionGeneralLlantas, setObservacionGeneralLlantas] = useState('');

  return {
    llantasParte1, setLlantasParte1, llantasParte2, setLlantasParte2, observacionGeneralLlantas, setObservacionGeneralLlantas
  }
};

export default Variables2;
