interface Insumo {
    id: number;
    nombre: string;
    disponibleSi: boolean;
    disponibleNo: boolean;
    disponibleNA: boolean;
}

interface StepOchoProps {
    insumos: Insumo[];
    setInsumos: (insumos: Insumo[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepOcho({ insumos, setInsumos, handlePreviousStep, handleNextStep }: StepOchoProps) {
    const validateStep8 = () => {
        const isInvalid = insumos.some((insumo) => 
            !insumo.disponibleSi && !insumo.disponibleNo && !insumo.disponibleNA
        );

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("Disponible (SI)", "Disponible (NO)" o "No Aplica (N/A)") para cada insumo.');
            return false;
        }
        return true;
    };

    const handleRadioChange = (insumoId: number, field: 'disponibleSi' | 'disponibleNo' | 'disponibleNA') => {
        const updatedInsumos = insumos.map((insumo) => {
            if (insumo.id === insumoId) {
                return {
                    ...insumo,
                    disponibleSi: field === 'disponibleSi',
                    disponibleNo: field === 'disponibleNo',
                    disponibleNA: field === 'disponibleNA'
                };
            }
            return insumo;
        });
        setInsumos(updatedInsumos);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Insumos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insumos.map((insumo) => (
                    <div key={insumo.id} className="mb-4">
                        <h3 className="font-bold">{insumo.nombre}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`insumo-${insumo.id}`}
                                checked={insumo.disponibleSi}
                                onChange={() => handleRadioChange(insumo.id, 'disponibleSi')}
                                className="mr-2"
                            />
                            Disponible (SI)
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`insumo-${insumo.id}`}
                                checked={insumo.disponibleNo}
                                onChange={() => handleRadioChange(insumo.id, 'disponibleNo')}
                                className="mr-2"
                            />
                            Disponible (NO)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`insumo-${insumo.id}`}
                                checked={insumo.disponibleNA}
                                onChange={() => handleRadioChange(insumo.id, 'disponibleNA')}
                                className="mr-2"
                            />
                            No Aplica (N/A)
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6">
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
                        if (validateStep8()) {
                            handleNextStep();
                        }
                    }}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default StepOcho;
