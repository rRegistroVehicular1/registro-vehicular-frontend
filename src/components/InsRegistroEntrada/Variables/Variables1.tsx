export const getInitialFormData = () => {
    return {
        revisiones: [
            { descripcion: "Revisión de golpes en unidades frente, atrás y laterales", opcion: null },
            { descripcion: "No dejar la llave en el vehículo y cerrarlo", opcion: null },
            { descripcion: "Dejar sin basura el camión, limpio por dentro y por fuera", opcion: null },
            { descripcion: "Dejar apagado las luces, radio, intermitentes y rotativa", opcion: null },
            { descripcion: "Maletín de primeros auxilios", opcion: null },
            { descripcion: "Conos", opcion: null },
            { descripcion: "Triángulos", opcion: null },
            { descripcion: "Extintor", opcion: null },
            { descripcion: "Llanta de repuesto", opcion: null },
            { descripcion: "Gato", opcion: null },
            { descripcion: "Carretilla, según aplique", opcion: null },
            { descripcion: "Poner cuñas", opcion: null }
        ]
    };
};

export type Revision = {
    descripcion: string;
    opcion: boolean | null;
};
