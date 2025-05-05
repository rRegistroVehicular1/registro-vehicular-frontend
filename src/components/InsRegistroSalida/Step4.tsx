import React from 'react';

interface Llantas {
    id: number;
    fp: boolean;
    pe: boolean;
    pa: boolean;
    desgaste: boolean;
}

interface StepCuatroProps {
    tipoVehiculo={tipoVehiculo};
    setTipoVehiculo={setTipoVehiculo};
    llantasParte2={llantasParte2};
    setLlantasParte2={setLlantasParte2};
    observacionGeneralLlantas={observacionGeneralLlantas};
    setObservacionGeneralLlantas={setObservacionGeneralLlantas};
    handlePreviousStep={handlePreviousStep};
    handleNextStep={handleNextStep};
    
    /*llantasParte2: Llantas[];
    setLlantasParte2: (llantas: Llantas[]) => void;
    tipoVehiculo: string;
    setTipoVehiculo: (tipo: string) => void;
    observacionGeneralLlantas: string;
    setObservacionGeneralLlantas: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;*/
}

function StepCuatro({ llantasParte2, setLlantasParte2, tipoVehiculo, setTipoVehiculo, observacionGeneralLlantas, setObservacionGeneralLlantas, handlePreviousStep, handleNextStep }: StepCuatroProps) {
    const handleOptionChange = (index: number, option: 'fp' | 'pe' | 'pa' | 'desgaste') => {
        const updatedLlantas = llantasParte2.map((llanta, i) => {
            if (i === index) {
                if (option === 'desgaste') {
                    // Alternar "desgaste" independientemente
                    return { ...llanta, desgaste: !llanta.desgaste };
                } else {
                    // Cambiar solo la opción seleccionada (fp, pe, pa) sin afectar "desgaste"
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
        setLlantasParte2(updatedLlantas);
    };

    const validateStep4 = () => {
        // Validar cantidad de llantas según tipo de vehículo
        const llantasEsperadasParte2 = tipoVehiculo === 'camion' ? 2 : 1;
        
        if (llantasParte2.length !== llantasEsperadasParte2) {
            alert(`Debe revisar todas las llantas requeridas para ${tipoVehiculo}`);
            return false;
        }
        
        // Validar que cada llanta tenga al menos una selección
        const isInvalid = llantasParte2.some((llanta) => {
            const noOptionSelected = !llanta.fp && !llanta.pe && !llanta.pa && !llanta.desgaste;
            return noOptionSelected;
        });

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción (FP, PE, PA o desgaste) para cada llanta.');
            return false;
        }

        // Validar que si FP o PE están marcados, se ingrese una observación
        const requiresObservation = llantasParte2.some((llanta) => llanta.fp || llanta.pe);

        if (requiresObservation && !observacionGeneralLlantas.trim()) {
            alert('Debe ingresar una observación general si marca FP o PE en alguna llanta.');
            return false;
        }

        return true;
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Revisión de Llantas (Parte 2)</h2>
            <div className="w-full">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {llantasParte2.map((llanta, index) => (
                                <div key={llanta.id} className="mb-4">
                                    <h3 className="font-bold">Llanta #{llanta.id} - {tipoVehiculo}<span className="text-red-500">*</span></h3>
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

            {/* Observaciones Generales debajo del grid, ocupando 100% */}
            <div className="mt-4">
                <label className="block font-bold mb-2">Observación General:</label>
                <textarea
                    value={observacionGeneralLlantas}
                    onChange={(e) => setObservacionGeneralLlantas(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    placeholder="Ingrese una observación general si marca FP o PE en alguna llanta"
                    disabled={!llantasParte2.some((llanta) => llanta.fp || llanta.pe)}
                />
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
                        if (validateStep4()) {
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

export default StepCuatro;
