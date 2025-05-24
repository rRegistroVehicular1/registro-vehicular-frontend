import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInitialFormData, Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { handleSubmit } from '../validation/InsRegistroEntrada';
import axios from 'axios';
import { BASE_URL } from '../validation/url';

function RegistroInspeccionEntrada() {

    const [formData, setFormData] = useState<{
        revisiones: Revision[];
        observacion: string;
        odometro: string;
    }>(() => ({
        revisiones: getInitialFormData().revisiones.map((revision) => ({
            ...revision,
            opcion: null,
        })),
        observacion: '',
        odometro: '',
    }));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastOdometro, setLastOdometro] = useState<number | null>(null);
    const [loadingOdometro, setLoadingOdometro] = useState(false);
    const navigate = useNavigate();

    // Obtener el último odómetro cuando se carga el componente
    useEffect(() => {
        const fetchLastOdometro = async () => {
            const lastPlacaInfo = localStorage.getItem('lastPlacaInfo');
            if (!lastPlacaInfo) return;
            
            try {
                const placaInfo = JSON.parse(lastPlacaInfo);
                const placa = placaInfo.placa;
                
                if (!placa) return;
                
                setLoadingOdometro(true);
                const response = await axios.get(`${BASE_URL}/ins-registro-entrada/last-odometro`, {
                    params: { placa }
                });
                
                const odometro = Number(response.data.lastOdometro) || 0;
                setLastOdometro(odometro);
                
                // Sugerir automáticamente el último odómetro como valor inicial
                if (odometro > 0 && (!formData.odometro || Number(formData.odometro) < odometro)) {
                    setFormData(prev => ({
                        ...prev,
                        odometro: String(odometro)
                    }));
                }
            } catch (error) {
                console.error('Error al obtener odómetro:', error);
            } finally {
                setLoadingOdometro(false);
            }
        };
        
        fetchLastOdometro();
    }, []);

    const handleInputChange = (index: number, value: boolean) => {
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
                    opcion: null,
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
                        </label>
                        <input
                            type="number"
                            name="odometro"
                            id="odometro"
                            min={lastOdometro || 0}
                            value={formData.odometro}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^[0-9]*$/.test(value)) {
                                    setFormData({ ...formData, odometro: value });
                                }
                            }}
                            className={`mt-1 p-2 border rounded w-full ${
                                lastOdometro !== null && Number(formData.odometro) < lastOdometro 
                                    ? 'border-red-500 bg-red-50' 
                                    : ''
                            }`}
                            placeholder="Odómetro de entrada"
                            required
                            disabled={loadingOdometro}
                        />
                        {lastOdometro !== null && (
                            <p className="text-sm text-gray-500 mt-1">
                                Último registro: {lastOdometro} (Ingrese igual o mayor)
                                {Number(formData.odometro) < lastOdometro && (
                                    <span className="block text-red-500">Ingrese un valor igual o mayor.</span>
                                )}
                            </p>
                        )}
                        {loadingOdometro && (
                            <p className="text-sm text-gray-500">Cargando último odómetro...</p>
                        )}
                    </div>
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
            </form>
        </div>
    );

}

export default RegistroInspeccionEntrada;
