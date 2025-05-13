import { Llanta } from '@/types/llantas';

interface LlantasStepProps {
    llantas: Llanta[];
    setLlantas: (llantas: Llanta[]) => void;
    titulo: string;
    observacionGeneral?: string;
    setObservacionGeneral?: (obs: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
    esUltimoPaso?: boolean;
}

export function LlantasStep({
    llantas,
    setLlantas,
    titulo,
    observacionGeneral,
    setObservacionGeneral,
    handlePreviousStep,
    handleNextStep,
    esUltimoPaso = false
}: LlantasStepProps) {
    const handleOptionChange = (id: number, option: 'fp' | 'pe' | 'pa' | 'desgaste') => {
        const updatedLlantas = llantas.map(llanta => {
            if (llanta.id === id) {
                if (option === 'desgaste') {
                    return { ...llanta, desgaste: !llanta.desgaste };
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
        setLlantas(updatedLlantas);
    };

    const validateStep = () => {
        // Validación para todas las llantas
        const llantasValidas = llantas.every(llanta => 
            llanta.fp || llanta.pe || llanta.pa || llanta.desgaste
        );

        // Validación adicional para el último paso (parte 2)
        if (esUltimoPaso) {
            const requiereObservacion = llantas.some(llanta => llanta.fp || llanta.pe);
            const observacionValida = !requiereObservacion || (observacionGeneral && observacionGeneral.trim() !== '');
            
            if (!observacionValida) {
                alert('Debe ingresar una observación general si marca FP o PE en alguna llanta');
                return false;
            }
        }

        if (!llantasValidas) {
            alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta');
            return false;
        }

        return true;
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">{titulo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="flex justify-center items-center order-1 md:order-1 mb-4 md:mb-0">
                    <img
                        src="/assets/Inspeccion_10llantas.jpg"
                        alt="Diagrama de inspección de llantas"
                        className="max-w-full max-h-[70vh] w-auto object-contain border border-gray-200 rounded-lg shadow-sm"
                    />
                </div>
                <div className="order-2 md:order-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {llantas.map((llanta) => (
                            <div key={llanta.id} className="mb-4">
                                <h3 className="font-bold">Llanta #{llanta.id} - {llanta.nombre}</h3>
                                {/* Opciones de presión */}
                                <div className="space-y-2">
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-opcion`}
                                            checked={llanta.fp}
                                            onChange={() => handleOptionChange(llanta.id, 'fp')}
                                            className="mr-2"
                                        />
                                        Falta de Presión (FP)
                                    </label>
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-opcion`}
                                            checked={llanta.pe}
                                            onChange={() => handleOptionChange(llanta.id, 'pe')}
                                            className="mr-2"
                                        />
                                        Presión Excesiva (PE)
                                    </label>
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-opcion`}
                                            checked={llanta.pa}
                                            onChange={() => handleOptionChange(llanta.id, 'pa')}
                                            className="mr-2"
                                        />
                                        Presión Adecuada (PA)
                                    </label>
                                </div>
                                {/* Opción de desgaste */}
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        checked={llanta.desgaste}
                                        onChange={() => handleOptionChange(llanta.id, 'desgaste')}
                                        className="mr-2"
                                    />
                                    Indicador de Desgaste
                                </label>
                            </div>
                        ))}
                    </div>
                    {/* Campo de observación solo para el último paso */}
                    {esUltimoPaso && (
                        <div className="mt-4">
                            <label className="block font-bold mb-2">Observación General:</label>
                            <textarea
                                value={observacionGeneral}
                                onChange={(e) => setObservacionGeneral?.(e.target.value)}
                                className="mt-1 p-2 border rounded w-full"
                                placeholder="Ingrese observaciones generales"
                                disabled={!llantas.some(llanta => llanta.fp || llanta.pe)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Botones de navegación */}
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
                    onClick={() => validateStep() && handleNextStep()}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
