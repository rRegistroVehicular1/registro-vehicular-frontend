import { Llanta } from '@/types/llantas';

interface StepCuatroProps {
    llantas: Llanta[];
    setLlantas: (llantas: Llanta[]) => void;
    observacionGeneralLlantas: string;
    setObservacionGeneralLlantas: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
    titulo: string;
    cantidadLlantas: 4 | 6 | 10;
}

function StepCuatro({ 
    llantas, 
    setLlantas,
    observacionGeneralLlantas,
    setObservacionGeneralLlantas,
    handlePreviousStep, 
    handleNextStep,
    titulo,
    cantidadLlantas
}: StepCuatroProps) {
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

    const validateStep4 = () => {
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
        if (requiresObservation && !observacionGeneralLlantas.trim()) {
            alert('Debe ingresar una observación general si marca FP o PE en alguna llanta.');
            return false;
        }

        return true;
    };

    // Seleccionar imagen según cantidad de llantas
    const getImagenLlantas = () => {
        switch(cantidadLlantas) {
            case 4:
                return "/assets/Inspeccion_4llantas.jpg";
            case 6:
                return "/assets/Inspeccion_6llantas.jpg";
            case 10:
                return "/assets/Inspeccion_10llantas.jpg";
            default:
                return "/assets/Inspeccion_4llantas.jpg";
        }
    };

    // Filtrar llantas según cantidad (por si acaso)
    const llantasMostradas = llantas.filter(llanta => {
        if (cantidadLlantas === 4) return [1, 2, 5, 7].includes(llanta.id);
        if (cantidadLlantas === 6) return [1, 2, 5, 6, 7, 8].includes(llanta.id);
        return true; // 10 llantas
    });

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">{titulo}</h2>
            <p className="text-center mb-4">Vehículo con {cantidadLlantas} llantas</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Imagen de referencia */}
                <div className="flex justify-center items-center order-1 md:order-1 mb-4 md:mb-0 md:h-[calc(100vh-200px)] md:sticky md:top-20">
                    <img
                        src={getImagenLlantas()}
                        alt={`Diagrama de inspección de ${cantidadLlantas} llantas`}
                        className="max-w-full max-h-[70vh] w-auto object-contain border border-gray-200 rounded-lg shadow-sm"
                    />
                </div>
                
                {/* Opciones de llantas */}
                <div className="order-2 md:order-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {llantasMostradas.map((llanta, index) => (
                            <div key={llanta.id} className="mb-4 p-2 border rounded">
                                <h3 className="font-bold">{llanta.nombre}</h3>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-presion`}
                                            checked={llanta.fp}
                                            onChange={() => handleOptionChange(index, 'fp')}
                                            className="mr-1"
                                        />
                                        Falta de Presión (FP)
                                    </label>
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-presion`}
                                            checked={llanta.pe}
                                            onChange={() => handleOptionChange(index, 'pe')}
                                            className="mr-1"
                                        />
                                        Presión Excesiva (PE)
                                    </label>
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name={`llanta-${llanta.id}-presion`}
                                            checked={llanta.pa}
                                            onChange={() => handleOptionChange(index, 'pa')}
                                            className="mr-1"
                                        />
                                        Presión Adecuada (PA)
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={llanta.desgaste}
                                            onChange={() => handleOptionChange(index, 'desgaste')}
                                            className="mr-1"
                                        />
                                        Indicador de Desgaste
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
                    value={observacionGeneralLlantas}
                    onChange={(e) => setObservacionGeneralLlantas(e.target.value)}
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
                    onClick={() => validateStep4() && handleNextStep()}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default StepCuatro;
