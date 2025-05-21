import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/validation/url';
import { getInitialFormData, Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { handleSubmit } from '../validation/InsRegistroEntrada';

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

    // Nuevo estado para el último odómetro
    const [lastOdometro, setLastOdometro] = useState<number | null>(null);
    const [placa, setPlaca] = useState(''); // Para almacenar la placa del localStorage
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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
            navigate("/");
        } 
    };


    useEffect(() => {
        // Obtener la placa del localStorage
        const lastPlacaInfo = localStorage.getItem('lastPlacaInfo');
        if (lastPlacaInfo) {
          try {
            const placaData = JSON.parse(lastPlacaInfo);
            setPlaca(placaData.placa || '');
            
            // Fetch del último odómetro
            const fetchLastOdometro = async () => {
              try {
                const response = await axios.get(`${BASE_URL}/ins-registro-entrada/last-odometro`, {
                  params: { placa: placaData.placa }
                });
                setLastOdometro(Number(response.data?.lastOdometro) || 0);
              } catch (error) {
                console.error('Error al obtener el último odometro:', error);
              }
            };
            
            fetchLastOdometro();
          } catch (e) {
            console.error('Error al analizar Informacion de la ultima placa ingresada:', e);
          }
        }
      }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validación del odómetro
        const odometroNum = Number(formData.odometro);
        if (isNaN(odometroNum) || odometroNum < 0) {
          alert("El odómetro debe ser un número válido");
          return;
        }
    
        if (lastOdometro !== null && odometroNum <= lastOdometro) {
          alert(`Error: El odómetro de entrada (${odometroNum}) debe ser mayor al último registro (${lastOdometro})`);
          return;
        }

    //const [isSubmitting, setIsSubmitting] = useState(false);
    //const navigate = useNavigate();

        try {
          const allFilled = formData.revisiones.every(item => item.opcion !== null);
          if (!allFilled) {
            throw new Error("Por favor, selecciona una opción en todas las revisiones");
          }
    
          setIsSubmitting(true);
          
          const lastPlacaInfo = localStorage.getItem('lastPlacaInfo');
          if (!lastPlacaInfo) {
            throw new Error('No se encontró información del vehículo');
          }
    
          const response = await axios.post(
            `${BASE_URL}/ins-registro-entrada/register`,
            {
              revisiones: formData.revisiones,
              observacion: formData.observacion,
              odometro: formData.odometro,
              lastPlacaInfo: lastPlacaInfo
            }
          );
            if (response.data.message) {
                alert(response.data.message);
                setFormData({
                  revisiones: formData.revisiones.map(item => ({
                    ...item,
                    opcion: null
                  })),
                  observacion: '',
                  odometro: ''
                });
                localStorage.removeItem('lastPlacaInfo');
                navigate('/');
              }
        } catch (error) {
          alert(error.message || 'Error al registrar los datos');
        } finally {
          setIsSubmitting(false);
        }
      };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
                R06-PT-19 REVISIÓN DE VEHÍCULOS -ENTRADA
            </h1>
            <p className="text-center text-lg font-semibold mb-4">Ingreso a la planta</p>
            <form className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
                {/*onSubmit={(e) =>
                    handleSubmit(e, formData, setIsSubmitting, setFormData, navigate)
                }*/}
                {lastOdometro !== null && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      <span className="font-bold">Último odómetro registrado:</span> {lastOdometro}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      El odómetro de entrada debe ser mayor a este valor
                    </p>
                  </div>
                )}
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Odómetro de entrada
                        </label>
                        <input
                            type="number"
                            min={lastOdometro ? lastOdometro + 1 : 0}
                            name="odometro"
                            id="odometro"
                            value={formData.odometro}
                            onChange={(e) =>
                                setFormData({ ...formData, odometro: e.target.value })
                            }
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Ingrese el Odómetro de Entrada"
                            required
                        />
                        {lastOdometro !== null && (
                            <p className="text-sm text-gray-500 mt-1">
                              Valor mínimo permitido: {lastOdometro + 1}
                            </p>
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
