
interface ParametroVisual {
    id: number;
    nombre: string;
    si: boolean;
    no: boolean;
}

interface StepSeisProps {
    parametrosVisuales: ParametroVisual[];
    setParametrosVisuales: (parametros: ParametroVisual[]) => void;
    observacionGeneralVisuales: string;
    setObservacionGeneralVisuales: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepSeis({
    parametrosVisuales,
    setParametrosVisuales,
    observacionGeneralVisuales,
    setObservacionGeneralVisuales,
    handlePreviousStep,
    handleNextStep,
}: StepSeisProps) {

    const handleOptionChange = (index: number, option: 'si' | 'no') => {
        const updatedParametros = parametrosVisuales.map((parametro, i) =>
            i === index
                ? { ...parametro, si: option === 'si', no: option === 'no' }
                : parametro
        );
        setParametrosVisuales(updatedParametros);
    };

    const validateStep6 = () => {
        const isInvalid = parametrosVisuales.some((parametro) => {
            const noOptionSelected = !parametro.si && !parametro.no;
            return noOptionSelected;
        });

        const requiresObservation = parametrosVisuales.some(parametro => parametro.no) && !observacionGeneralVisuales.trim();

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("SI" o "NO") para cada parámetro.');
            return false;
        }

        if (requiresObservation) {
            alert('Debe ingresar una observación general si marca "NO" en algún parámetro.');
            return false;
        }
        console.log(`parametro.si: ${parametro.si} - parametro.no: ${parametro.no} - observacionGeneralVisuales: ${observacionGeneralVisuales} - requiresObservation: ${requiresObservation} `)
        return true;
    };

    const requiresObservation = parametrosVisuales.some(parametro => parametro.no);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Parámetros Visuales del Motor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parametrosVisuales.map((parametro, index) => (
                    <div key={parametro.id} className="mb-4">
                        <h3 className="font-bold">{parametro.nombre}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`parametro-${parametro.id}`}
                                checked={parametro.si}
                                onChange={() => handleOptionChange(index, 'si')}
                            />
                            Funciona Correctamente (SI)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`parametro-${parametro.id}`}
                                checked={parametro.no}
                                onChange={() => handleOptionChange(index, 'no')}
                            />
                            Funciona Correctamente (NO)
                        </label>
                    </div>
                ))}
            </div>

            {requiresObservation && (
                <div className="mt-4">
                    <label className="block font-bold mb-2">Observación General:</label>
                    <textarea
                        value={observacionGeneralVisuales}
                        onChange={(e) => setObservacionGeneralVisuales(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Debe ingresar una observación si algún parámetro está en 'NO'"
                    />
                </div>
            )}

            <div className="flex justify-between mt-4">
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
                        if (validateStep6()) {
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

export default StepSeis;
