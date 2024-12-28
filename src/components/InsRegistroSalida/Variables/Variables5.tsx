import { useState } from "react";

function Variables5(){
    
    const [documentacion, setDocumentacion] = useState(
        [
          { id: 1, nombre: 'Permiso bimensual de CBP', disponibleSi: false, disponibleNo: false },
          { id: 2, nombre: 'Permiso anual de CBP', disponibleSi: false, disponibleNo: false },
          { id: 3, nombre: 'Póliza de seguro', disponibleSi: false, disponibleNo: false },
          { id: 4, nombre: 'Tarjeta de pesos y dimensiones', disponibleSi: false, disponibleNo: false },
          { id: 5, nombre: 'Licencia de conducir tipo Comercial o H', disponibleSi: false, disponibleNo: false },
          { id: 6, nombre: 'Hoja de Seguridad de los Productos', disponibleSi: false, disponibleNo: false },
          { id: 7, nombre: 'Plan de Emergencia', disponibleSi: false, disponibleNo: false },
          { id: 8, nombre: 'Registro único vehicular', disponibleSi: false, disponibleNo: false },
        ]
      );
    
      const [danosCarroceria, setDanosCarroceria] = useState([
        { id: 1, vista: 'Frontal', rayones: false, golpes: false, quebrado: false, faltante: false },
        { id: 2, vista: 'Posterior', rayones: false, golpes: false, quebrado: false, faltante: false },
        { id: 3, vista: 'Lateral Izquierda', rayones: false, golpes: false, quebrado: false, faltante: false },
        { id: 4, vista: 'Lateral Derecha', rayones: false, golpes: false, quebrado: false, faltante: false }
      ]);

    return{
        documentacion, setDocumentacion, danosCarroceria, setDanosCarroceria
    }
}

export default Variables5;