interface Documento {
    id: number;
    nombre: string;
    disponibleSi: boolean;
    disponibleNo: boolean;
    disponibleNA: boolean;

}

interface StepNueveProps {
    documentacion: Documento[];
    setDocumentacion: (documentos: Documento[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepNueve({ documentacion, setDocumentacion, handlePreviousStep, handleNextStep }: StepNueveProps) {

    const validateStep9 = () => {
        const isInvalid = documentacion.some((doc) => !doc.disponibleSi && !doc.disponibleNo && !doc.disponibleNA
);

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("Disponible (SI)", "Disponible (NO)" o "No Aplica (N/A)") para cada documento.');
            return false;
        }
        //console.log(`doc: ${doc} - isInvalid: ${isInvalid} `);
        return true;
    };

    const handleRadioChange = (documentoId: number, field: 'disponibleSi' | 'disponibleNo' | 'disponibleNA') => {
        const updatedDocumentos = documentacion.map((doc) => {
            if (doc.id === documentoId) {
                return {
                    ...doc,
                    disponibleSi: field === 'disponibleSi',
                    disponibleNo: field === 'disponibleNo',
                    disponibleNA: field === 'disponibleNA'
                };
            }
            return doc;
        });
        setInsumos(updatedDocumentos);
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
                                type="radio"
                                name={`documento-${doc.id}`}
                                checked={doc.disponibleSi}
                                onChange={() => handleRadioChange(doc.id, 'disponibleSi')}
                            />
                            Disponible (SI)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`documento-${doc.id}`}
                                checked={doc.disponibleNo}
                                onChange={() => handleRadioChange(doc.id, 'disponibleNo')}
                            />
                            Disponible (NO)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`documento-${doc.id}`}
                                checked={doc.disponibleNA}
                                onChange={() => handleRadioChange(doc.id, 'disponibleNA')}
                            />
                            No Aplica (N/A)
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
