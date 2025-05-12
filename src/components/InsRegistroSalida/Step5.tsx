import React from 'react';

interface Fluido {
    id: number;
    nombre: string;
    requiere: boolean;
    lleno: boolean;
}

interface StepCincoProps {
    fluidos: Fluido[];
    setFluidos: (fluidos: Fluido[]) => void;
    observacionGeneral: string;
    setObservacionGeneral: (observacion: string) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepCinco({ fluidos, setFluidos, observacionGeneral, setObservacionGeneral, handlePreviousStep, handleNextStep }: StepCincoProps) {

    const handleOptionChange = (index: number, option: 'requiere' | 'lleno') => {
        const updatedFluidos = fluidos.map((fluido, i) =>
            i === index
                ? { id: fluido.id, nombre: fluido.nombre, requiere: option === 'requiere', lleno: option === 'lleno'}
                : fluido
        );
        setFluidos(updatedFluidos);
    };

    const validateStep5 = () => {
        const isInvalid = fluidos.some((fluido) => {
            const noOptionSelected = !fluido.requiere && !fluido.lleno;
            return noOptionSelected;
        });

        const requiresObservation = fluidos.some(fluido => fluido.requiere) && !observacionGeneral.trim();

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("Requiere" o "Lleno") para cada fluido.');
            return false;
        }

        if (requiresObservation) {
            alert('Debe ingresar una observación general si marca "Requiere" en algún fluido.');
            return false;
        }
        console.log(`fluidos.requiere: ${fluidos.requiere} - fluidos.lleno: ${fluidos.lleno} - observacionGeneral: ${observacionGeneral} - isInvalid: ${isInvalid} `)
        return true;
    };

    const requiresObservation = fluidos.some(fluido => fluido.requiere);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Fluidos del Motor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fluidos.map((fluido, index) => (
                    <div key={fluido.id} className="mb-4">
                        <h3 className="font-bold">{fluido.nombre}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`fluido-${fluido.id}`}
                                checked={fluido.requiere}
                                onChange={() => handleOptionChange(index, 'requiere')}
                            />
                            Requiere
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`fluido-${fluido.id}`}
                                checked={fluido.lleno}
                                onChange={() => handleOptionChange(index, 'lleno')}
                            />
                            Lleno
                        </label>
                    </div>
                ))}
            </div>

            {requiresObservation && (
                <div className="mt-4">
                    <label className="block font-bold mb-2">Observación General:</label>
                    <textarea
                        value={observacionGeneral}
                        onChange={(e) => setObservacionGeneral(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Ingrese una observación general si marca 'Requiere' en algún fluido"
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
                        if (validateStep5()) {
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

export default StepCinco;
