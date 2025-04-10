interface Llantas {
    id: number;
    fp: boolean;
    pe: boolean;
    pa: boolean;
    desgaste: boolean;
}

interface StepTresProps {
    llantasParte1: Llantas[];
    setLlantasParte1: (llantas: Llantas[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepTres({ llantasParte1, setLlantasParte1, handlePreviousStep, handleNextStep }: StepTresProps) {
    const handleOptionChange = (index: number, option: 'fp' | 'pe' | 'pa' | 'desgaste') => {
        const updatedLlantas = llantasParte1.map((llanta, i) => {
            if (i === index) {
                if (option === 'desgaste') {
                    return { ...llanta, desgaste: !llanta.desgaste }; // Alternar "desgaste"
                } else {
                    return {
                        ...llanta,
                        fp: option === 'fp',
                        pe: option === 'pe',
                        pa: option === 'pa',
                    };
                }
            }
            return llanta;
        });
        setLlantasParte1(updatedLlantas);
    };

    const validateStep3 = () => {
        const isInvalid = llantasParte1.some((llanta) => {
            const noOptionSelected = !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste;
            return noOptionSelected;
        });

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta.');
            return false;
        }

        return true;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sección de opciones de llantas (ocupa dos columnas en pantallas medianas o más grandes) */}
            <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Revisión de Llantas (Parte 1)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {llantasParte1.map((llanta, index) => (
                        <div key={llanta.id} className="mb-4">
                            <h3 className="font-bold">Llanta #{llanta.id}</h3>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name={`llanta-${llanta.id}-opcion`}
                                    checked={llanta.fp}
                                    onChange={() => handleOptionChange(index, 'fp')}
                                />
                                Falta de Presión (FP)
                            </label>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name={`llanta-${llanta.id}-opcion`}
                                    checked={llanta.pe}
                                    onChange={() => handleOptionChange(index, 'pe')}
                                />
                                Presión Excesiva (PE)
                            </label>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name={`llanta-${llanta.id}-opcion`}
                                    checked={llanta.pa}
                                    onChange={() => handleOptionChange(index, 'pa')}
                                />
                                Presión Adecuada (PA)
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name={`llanta-${llanta.id}-desgaste`}
                                    checked={llanta.desgaste}
                                    onChange={() => handleOptionChange(index, 'desgaste')}
                                />
                                Indicador de Desgaste
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Imagen al costado derecho */}
            <div className="flex justify-center items-start">
                <img
                    src="https://github.com/rRegistroVehicular1/registro-vehicular-frontend/blob/main/src/assets/Indicador.png"
                    alt="Descripción de las llantas de las unidades"
                    className="max-w-full h-auto"
                />
            </div>

            {/* Botones de Atras y Siguiente */}
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
                            if (validateStep3()) {
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

export default StepTres;

