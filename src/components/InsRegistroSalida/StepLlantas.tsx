// components/StepLlantas.tsx
import { Llanta } from '@/types/llantas';

interface StepLlantasProps {
    llantas: Llanta[];
    setLlantas: (llantas: Llanta[]) => void;
    observacionGeneral: string;
    setObservacionGeneral: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
    titulo: string;
}

function StepLlantas({ 
    llantas, 
    setLlantas,
    observacionGeneral,
    setObservacionGeneral,
    handlePreviousStep, 
    handleNextStep,
    titulo
}: StepLlantasProps) {
    const handleOptionChange = (index: number, option: 'fp' | 'pe' | 'pa' | 'desgaste') => {
        const updatedLlantas = llantas.map((llanta, i) => {
            if (i === index) {
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
        // Validar que cada llanta tenga al menos una selección
        const isInvalid = llantas.some(llanta => 
            !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste
        );

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta.');
            return false;
        }

        // Validar observación si hay FP o PE
        const requiresObservation = llantas.some(llanta => llanta.fp || llanta.pe);
        if (requiresObservation && !observacionGeneral.trim()) {
            alert('Debe ingresar una observación general si marca FP o PE en alguna llanta.');
            return false;
        }

        return true;
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">{titulo}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Imagen de referencia */}
                <div className="flex justify-center items-center order-1 md:order-1 mb-4 md:mb-0 md:h-[calc(100vh-200px)] md:sticky md:top-20">
                    <img
                        src="/assets/Inspeccion_10llantas.jpg"
                        alt="Diagrama de inspección de llantas"
                        className="max-w-full max-h-[70vh] w-auto object-contain border border-gray-200 rounded-lg shadow-sm"
                    />
                </div>
                
                {/* Opciones de llantas */}
                <div className="order-2 md:order-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {llantas.map((llanta, index) => (
                            <div key={llanta.id} className="mb-4 p-2 border rounded">
                                <h3 className="font-bold">{llanta.nombre}</h3>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-presion`}
                                            checked={llanta.fp}
                                            onChange={() => handleOptionChange(index, 'fp')}
                                            className="mr-1"
                                        />
                                        FP
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-presion`}
                                            checked={llanta.pe}
                                            onChange={() => handleOptionChange(index, 'pe')}
                                            className="mr-1"
                                        />
                                        PE
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-presion`}
                                            checked={llanta.pa}
                                            onChange={() => handleOptionChange(index, 'pa')}
                                            className="mr-1"
                                        />
                                        PA
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={llanta.desgaste}
                                            onChange={() => handleOptionChange(index, 'desgaste')}
                                            className="mr-1"
                                        />
                                        Desgaste
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Observaciones Generales */}
            <div className="mt-4">
                <label className="block font-bold mb-2">Observación General:</label>
                <textarea
                    value={observacionGeneral}
                    onChange={(e) => setObservacionGeneral(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    placeholder="Ingrese observaciones sobre las llantas"
                    rows={3}
                />
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

export default StepLlantas;
