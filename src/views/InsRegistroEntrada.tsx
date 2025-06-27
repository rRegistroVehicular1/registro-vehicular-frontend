import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInitialFormData, Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { handleSubmit } from '../validation/InsRegistroEntrada';
import { BASE_URL } from '../validation/url'; // Asegúrate de que esta constante esté definida

function RegistroInspeccionEntrada() {

    const [formData, setFormData] = useState<{
        revisiones: Revision[];
        observacion: string;
        odometro: string;
    }>(() => ({
        revisiones: getInitialFormData().revisiones.map((revision) => ({
            ...revision,
            opcion: undefined,
        })),
        observacion: '',
        odometro: '',
    }));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastOdometroSalida, setLastOdometroSalida] = useState<number | null>(null);
    const [loadingOdometro, setLoadingOdometro] = useState(false);
    const navigate = useNavigate();

    const fetchLastOdometroSalida = async () => {
        const lastPlacaInfo = localStorage.getItem('lastPlacaInfo');
        if (!lastPlacaInfo) return;
    
        try {
            setLoadingOdometro(true);
            const placaInfo = JSON.parse(lastPlacaInfo);
            const placa = placaInfo.placa;
            
            const response = await fetch(`${BASE_URL}/ins-registro-entrada/last-odometro-salida?placa=${placa}`);
            const data = await response.json();
            
            if (data.lastOdometroSalida !== undefined) {
                setLastOdometroSalida(Number(data.lastOdometroSalida));
            }
        } catch (error) {
            console.error('Error al obtener último odómetro de salida:', error);
        } finally {
            setLoadingOdometro(false);
        }
    };
    
    useEffect(() => {
        fetchLastOdometroSalida();
    }, []);

    const handleInputChange = (index: number, value: boolean | undefined) => {
        const newRevisiones = [...formData.revisiones];
        newRevisiones[index].opcion = value;
        setFormData({
            ...formData,
            revisiones: newRevisiones,
        });
    };

    const handleCancel = () => {
        const confirmCancel = window.confirm(
            '¿Está seguro de que desea cancelar? Los cambios se perderán.'
        );
        if (confirmCancel) {
            setFormData({
                revisiones: getInitialFormData().revisiones.map((revision) => ({
                    descripcion: revision.descripcion,
                    opcion: undefined,
                })),
                observacion: '',
                odometro:"",
            });
        }
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
                R06-PT-19 REVISIÓN DE VEHÍCULOS -ENTRADA
            </h1>
            <p className="text-center text-lg font-semibold mb-4">Ingreso a la planta</p>
            <form
                className="w-full max-w-3xl bg-white p-6 rounded shadow-md"
                onSubmit={(e) =>
                    handleSubmit(e, formData, setIsSubmitting, setFormData, navigate)
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Odómetro de entrada
                            <input
                                type="number"
                                name="odometro"
                                id="odometro"
                                min={lastOdometroSalida ? lastOdometroSalida + 1 : 0}
                                value={formData.odometro}
                                onChange={(e) =>
                                    setFormData({ ...formData, odometro: e.target.value })
                                }
                                className={`mt-1 p-2 border rounded w-full${
                                    lastOdometroSalida !== null && Number(formData.odometro) <= lastOdometroSalida 
                                        ? 'border-red-500 bg-red-50' 
                                        : ''
                                    }`}
                                required
                                disabled={loadingOdometro}
                                placeholder="Odómetro de entrada"            
                            />
                            {lastOdometroSalida !== null && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Último odómetro de SALIDA: {lastOdometroSalida} 
                                    {Number(formData.odometro) <= lastOdometroSalida && (
                                        <span className="block text-red-500">
                                            (El odómetro de entrada debe ser mayor al último odómetro de salida.)
                                        </span>
                                    )}
                                </p>
                            )}
                        </label>
                    </div>
                    <p>(Coloque SI, NO o N/A en la acción ó parametros que apliquen)</p>
                    {formData.revisiones.map((item, index) => (
                        <div key={index} className="p-4 bg-gray-50 border rounded">
                            <label className="block text-gray-700 font-semibold mb-2">
                                {item.descripcion}
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`respuesta-${index}`}
                                        checked={item.opcion === true}
                                        onChange={() => handleInputChange(index, true)}
                                        className="form-radio h-5 w-5"
                                    />
                                    <span className="ml-2">Sí</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`respuesta-${index}`}
                                        checked={item.opcion === false}
                                        onChange={() => handleInputChange(index, false)}
                                        className="form-radio h-5 w-5"
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`respuesta-${index}`}
                                        checked={item.opcion === undefined}
                                        onChange={() => handleInputChange(index, undefined)}
                                        className="form-radio h-5 w-5"
                                    />
                                    <span className="ml-2">N/A</span>
                                </label>
                            </div>
                        </div>
                    ))}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Observación General
                        </label>
                        <textarea
                            name="observacion"
                            id="observacion"
                            value={formData.observacion}
                            onChange={(e) =>
                                setFormData({ ...formData, observacion: e.target.value })
                            }
                            className="w-full p-2 border rounded mt-1"
                            rows={4}
                            placeholder="Escribe aquí las observaciones generales..."
                        ></textarea>
                    </div>
                </div>
                <div className="mt-4 flex flex-col md:flex-row md:justify-between md:space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full md:w-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mt-2 md:mt-0"
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
                <div>
                    <a href="/falla">
                      <button className="w-full mt-10 bg-green-500 text-white py-2 px-4 rounded">
                        Reportar una falla
                      </button>
                    </a>
                </div>
            </form>
        </div>
    );

}

export default RegistroInspeccionEntrada;
