import { useState } from "react";

function Variables3() {

  const [fluidos, setFluidos] = useState(
    [
      { id: 1, nombre: 'Niveles de aceite de motor', requiere: false, lleno: false },
      { id: 2, nombre: 'Niveles de líquido de freno', requiere: false, lleno: false },
      { id: 3, nombre: 'Niveles de líquido de power steering', requiere: false, lleno: false },
      { id: 4, nombre: 'Niveles de líquido de radiador (Coolant)', requiere: false, lleno: false },
    ]
  );

  const [observacionGeneralFluido, setObservacionGeneralFluido] = useState("");

  const [parametrosVisuales, setParametrosVisuales] = useState(
    [
      { id: 1, nombre: 'Inspección de radiador y aspa', si: false, no: false },
      { id: 2, nombre: 'Inspección de mangueras y conexiones', si: false, no: false },
      { id: 3, nombre: 'Inspección de correas externas del motor', si: false, no: false },
      { id: 4, nombre: 'Comprobación de fugas (Superficies de Acoplamiento)', si: false, no: false },
    ]
  );

  const [observacionGeneralVisuales, setObservacionGeneralVisuales] = useState("");

  return {
    fluidos, setFluidos, observacionGeneralFluido, setObservacionGeneralFluido,
    parametrosVisuales, setParametrosVisuales, observacionGeneralVisuales, setObservacionGeneralVisuales
  };
}

export default Variables3;