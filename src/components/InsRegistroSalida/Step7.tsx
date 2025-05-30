import React from 'react';

interface Luz {
    id: number;
    nombre: string;
    funcionaSi: boolean;
    funcionaNo: boolean;
    funcionaNA: boolean;
}

interface StepSieteProps {
    luces: Luz[];
    setLuces: (luces: Luz[]) => void;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

function StepSiete({ luces, setLuces, handlePreviousStep, handleNextStep }: StepSieteProps) {

    const validateStep7 = () => {
        const isInvalid = luces.some((luz) => !luz.funcionaSi && !luz.funcionaNo && !luz.funcionaNA);

        if (isInvalid) {
            alert('Debe seleccionar al menos una opción ("Funciona (SI)", "Funciona (NO)" o "No Aplica (N/A)") para cada luz.');
            return false;
        }
        //console.log(`luz.funcionaSi: ${luz.funcionaSi} - luz.funcionaNo: ${luz.funcionaNo} - isInvalid: ${isInvalid} `);
        return true;
    };

    const handleRadioChange = (luzId: number, field: 'funcionaSi' | 'funcionaNo' | 'funcionaNA') => {
        const updatedLuces = luces.map((luz) => {
            if (luz.id === luzId) {
                return {
                    ...luz,
                    funcionaSi: field === 'funcionaSi',
                    funcionaNo: field === 'funcionaNo',
                    funcionaNA: field === 'funcionaNA'
                };
            }
            return luz;
        });
        setLuces(updatedLuces);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Revisión de Luces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {luces.map((luz) => (
                    <div key={luz.id} className="mb-4">
                        <h3 className="font-bold">{luz.nombre}</h3>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`luz-${luz.id}`}
                                checked={luz.funcionaSi}
                                onChange={() => handleRadioChange(luz.id, 'funcionaSi')}
                            />
                            Funciona (SI)
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name={`luz-${luz.id}`}
                                checked={luz.funcionaNo}
                                onChange={() => handleRadioChange(luz.id, 'funcionaNo')}
                            />
                            Funciona (NO)
                        </label>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name={`luz-${luz.id}`}
                                checked={luz.funcionaNA}
                                onChange={() => handleRadioChange(luz.id, 'funcionaNA')}
                            />
                            No Aplica (N/A)
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
                        if (validateStep7()) {
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

export default StepSiete;
