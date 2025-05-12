interface Insumo {
    id: number;
    nombre: string;
    disponibleSi: boolean;
    disponibleNo: boolean;
}

interface StepOchoProps {
    insumos: Insumo[];
    setInsumos: (insumos: Insumo[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepOcho({ insumos, setInsumos, handlePreviousStep, handleNextStep }: StepOchoProps) {

    const validateStep8 = () => {
        const isInvalid = insumos.some((insumo) => !insumo.disponibleSi && !insumo.disponibleNo);

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("Disponible (SI)" o "Disponible (NO)") para cada insumo.');
            return false;
        }
        //console.log(`insumo: ${insumo} - isInvalid: ${isInvalid} `);
        return true;
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
                                type="checkbox"
                                checked={insumo.disponibleSi}
                                onChange={(e) => {
                                    const updatedInsumos = [...insumos];
                                    updatedInsumos[insumo.id - 1] = { ...updatedInsumos[insumo.id - 1], disponibleSi: e.target.checked, disponibleNo: !e.target.checked };
                                    setInsumos(updatedInsumos);
                                }}
                            />
                            Disponible (SI)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={insumo.disponibleNo}
                                onChange={(e) => {
                                    const updatedInsumos = [...insumos];
                                    updatedInsumos[insumo.id - 1] = { ...updatedInsumos[insumo.id - 1], disponibleNo: e.target.checked, disponibleSi: !e.target.checked };
                                    setInsumos(updatedInsumos);
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
};

export default StepOcho;
