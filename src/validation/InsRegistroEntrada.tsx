import axios from 'axios';
import { Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { BASE_URL } from './url';

export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>,
    formData: { revisiones: Revision[]; observacion: string; odometro: string; },
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setFormData: React.Dispatch<React.SetStateAction<{ revisiones: Revision[]; observacion: string; odometro: string; }>>,
    navigate: (path: string) => void) => {e.preventDefault();

    const allFilled = formData.revisiones.every(item => item.opcion !== null);
    if (!allFilled) {
        alert("Por favor, selecciona una opción en todas las revisiones.");
        return;
    }

    setIsSubmitting(true);

    const lastPlacaInfo = localStorage.getItem('lastPlacaInfo');

    if (!lastPlacaInfo) {
        alert('No se encontró información de "lastPlacaInfo" en el localStorage.');
        setIsSubmitting(false);
        return;
    }

    const formDataToSend = {
        revisiones: formData.revisiones.map(({ descripcion, opcion }) => ({
            descripcion,
            opcion,
        })),
        observacion: formData.observacion,
        lastPlacaInfo,
        odometro:formData.odometro,
    };

    try {
        await handleSubmit({
          e,
          formData,
          setIsSubmitting,
          setFormData,
          navigate
        });
        const response = await axios.post(
            `${BASE_URL}/ins-registro-entrada/register`,
            formDataToSend,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.message) {
            alert(response.data.message);

            setFormData({
                revisiones: formData.revisiones.map(({ descripcion }) => ({
                    descripcion,
                    opcion: null,
                })),
                observacion: '',
                odometro: "",
            });

            navigate('/');
            localStorage.removeItem('lastPlacaInfo');
        }
    } catch (error) {
        // Manejo seguro de errores TypeScript
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message;
          if (typeof errorMessage === 'string' && errorMessage.includes('VALIDACION_ODOMETRO')) {
            const errorMsg = errorMessage.split(':')[1].trim();
            alert(`Error: ${errorMsg}`);
          } else {
            alert('Error al registrar: ' + (errorMessage || error.message));
          }
        } else if (error instanceof Error) {
          alert('Error inesperado: ' + error.message);
        } else {
          alert('Error desconocido');
        }
      } finally {
        setIsSubmitting(false);
      }
};
