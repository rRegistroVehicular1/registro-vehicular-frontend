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
        <div className="w-full">
            <div className="w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Revisión de Llantas (Parte 1)</h2>
                {/* Contenedor principal con grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    {/* Imagen de referencia - 50% del ancho - orden primero */}
                    <div className="flex justify-center items-center order-1 md:order-1 mb-4 mb:mb-0 md:h-[calc(100vh-200px) md:sticky md:top-20]">
                        <img
                            src="/assets/Inspeccion_10llantas.jpg"
                            alt="Ejemplo Diagrama de inspección de llantas"
                            className="max-w-full max-h-[70vh] w-auto object-contain border border-gray-200 rounded-lg shadow-sm"
                        />
                    </div>
                
                    {/* Columna de opciones - 50% del ancho - orden segundo */}
                    <div className="order-2 md:order-2">
                        {/*<h2 className="text-xl font-bold mb-4">Revisión de Llantas (Parte 1)</h2>*/}
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
                </div>
            </div>
             {/* Botones debajo del grid, ocupando 100% */}
            <div className="flex justify-between mt-6 w-full">
                <button
                    type="button"
                    className="bg-gray-500 text-white px-6 py-3 rounded"
                    onClick={handlePreviousStep}
                >
                   Atrás
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-6 py-3 rounded"
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

