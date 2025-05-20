import React from 'react';

interface DanosCarroceria {
    id: number;
    vista: string;
    rayones: boolean;
    golpes: boolean;
    quebrado: boolean;
    faltante: boolean;
}

interface StepDiezProps {
    danosCarroceria: DanosCarroceria[];
    setDanosCarroceria: (danos: DanosCarroceria[]) => void;
    handlePreviousStep: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isSubmitting: boolean;
}

const StepDiez: React.FC<StepDiezProps> = ({
    danosCarroceria,
    setDanosCarroceria,
    handlePreviousStep,
    handleSubmit,
    isSubmitting
}) => {

    /*const handleRadioChange = (index: number, option: string) => {
        const updatedDanos = danosCarroceria.map((danos, i) => {
            if (i === index) {
                return {
                    ...danos,
                    rayones: option === 'rayones',
                    golpes: option === 'golpes',
                    quebrado: option === 'quebrado',
                    faltante: option === 'faltante'
                };
            }
            return danos;
        });
        setDanosCarroceria(updatedDanos);
    };*/

    const handleCheckboxChange = (index: number, field: keyof DanosCarroceria) => {
        const updatedDanos = danosCarroceria.map((danos, i) => {
          if (i === index) {
            return {
              ...danos,
              [field]: !danos[field] // Toggle the boolean value
            };
          }
          return danos;
        });
        setDanosCarroceria(updatedDanos);
      };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Parámetros de Daños en Carrocería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {danosCarroceria.map((danos, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold">Vista {danos.vista}</h3>

                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                //disabled={true}
                                name={`danos-${index}`}
                                checked={danos.rayones}
                                onChange={() => handleRadioChange(index, 'rayones')}
                            />
                            Rayones (X)
                        </label>

                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                //disabled={true} 
                                name={`danos-${index}`}
                                checked={danos.golpes}
                                onChange={() => handleRadioChange(index, 'golpes')}
                            />
                            Golpe (/)
                        </label>

                        <label className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                //disabled={true} 
                                name={`danos-${index}`}
                                checked={danos.quebrado}
                                onChange={() => handleRadioChange(index, 'quebrado')}
                            />
                            Quebrado (O)
                        </label>

                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                //disabled={true} 
                                name={`danos-${index}`}
                                checked={danos.faltante}
                                onChange={() => handleRadioChange(index, 'faltante')}
                            />
                            Faltante (*)
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
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
};

export default StepDiez;
