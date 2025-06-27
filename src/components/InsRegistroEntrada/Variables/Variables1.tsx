export const getInitialFormData = () => {
    return {
        revisiones: [
            { descripcion: "Revisión de golpes en unidades frente, atrás y laterales", opcion: undefined },
            { descripcion: "No dejar la llave en el vehículo y cerrarlo", opcion: undefined },
            { descripcion: "Dejar sin basura el camión, limpio por dentro y por fuera", opcion: undefined },
            { descripcion: "Dejar apagado las luces, radio, intermitentes y rotativa", opcion: undefined },
            { descripcion: "Maletín de primeros auxilios", opcion: undefined },
            { descripcion: "Conos", opcion: undefined },
            { descripcion: "Triángulos", opcion: undefined },
            { descripcion: "Extintor", opcion: undefined },
            { descripcion: "Llanta de repuesto", opcion: undefined },
            { descripcion: "Gato", opcion: undefined },
            { descripcion: "Carretilla, según aplique", opcion: undefined },
            { descripcion: "Poner cuñas", opcion: undefined }
        ]
    };
};

export type Revision = {
    descripcion: string;
    opcion: boolean | undefined;
};
