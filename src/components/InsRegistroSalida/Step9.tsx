interface Documento {
    id: number;
    nombre: string;
    disponibleSi: boolean;
    disponibleNo: boolean;
}

interface StepNueveProps {
    documentacion: Documento[];
    setDocumentacion: (documentos: Documento[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepNueve({ documentacion, setDocumentacion, handlePreviousStep, handleNextStep }: StepNueveProps) {

    const validateStep9 = () => {
        const isInvalid = documentacion.some((doc) => !doc.disponibleSi && !doc.disponibleNo);

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("Disponible (SI)" o "Disponible (NO)") para cada documento.');
            return false;
        }
        //console.log(`doc: ${doc} - isInvalid: ${isInvalid} `);
        return true;
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Documentación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentacion.map((doc) => (
                    <div key={doc.id} className="mb-4">
                        <h3 className="font-bold">{doc.nombre}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={doc.disponibleSi}
                                onChange={(e) => {
                                    const updatedDocumentacion = [...documentacion];
                                    updatedDocumentacion[doc.id - 1] = { ...updatedDocumentacion[doc.id - 1], disponibleSi: e.target.checked, disponibleNo: !e.target.checked };
                                    setDocumentacion(updatedDocumentacion);
                                }}
                            />
                            Disponible (SI)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={doc.disponibleNo}
                                onChange={(e) => {
                                    const updatedDocumentacion = [...documentacion];
                                    updatedDocumentacion[doc.id - 1] = { ...updatedDocumentacion[doc.id - 1], disponibleNo: e.target.checked, disponibleSi: !e.target.checked };
                                    setDocumentacion(updatedDocumentacion);
                                }}
                            />
                            Disponible (NO)
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handlePreviousStep}
                >
                    Atrás
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        if (validateStep9()) {
                            handleNextStep();
                        }
                    }}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default StepNueve;
