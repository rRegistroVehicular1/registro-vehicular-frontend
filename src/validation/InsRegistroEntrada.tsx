import axios from 'axios';
import { Revision } from '../components/InsRegistroEntrada/Variables/Variables1';
import { BASE_URL } from './url';

export const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: { revisiones: Revision[]; observacion: string; odometro: string; },
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setFormData: React.Dispatch<React.SetStateAction<{ revisiones: Revision[]; observacion: string; odometro: string; }>>,
    navigate: (path: string) => void
) => {
    e.preventDefault();

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
        console.error(error);
        alert('Error al registrar los datos');
    } finally {
        setIsSubmitting(false);
    }
};
