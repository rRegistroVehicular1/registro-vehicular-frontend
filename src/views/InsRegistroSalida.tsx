import StepDos from '../components/InsRegistroSalida/Step2';
import StepTres from '../components/InsRegistroSalida/Step3';
import StepCuatro from '../components/InsRegistroSalida/Step4';
import StepCinco from '../components/InsRegistroSalida/Step5';
import StepSeis from '../components/InsRegistroSalida/Step6';
import StepSiete from '../components/InsRegistroSalida/Step7';
import StepOcho from '../components/InsRegistroSalida/Step8';
import StepNueve from '../components/InsRegistroSalida/Step9';
import StepDiez from '../components/InsRegistroSalida/Step10';
import Variables2 from '../components/InsRegistroSalida/Variables/Variables2';
import Variables3 from '../components/InsRegistroSalida/Variables/Variables3';
import Variables4 from '../components/InsRegistroSalida/Variables/Variables4';
import Variables5 from '../components/InsRegistroSalida/Variables/Variables5';
import Variables1 from '../components/InsRegistroSalida/Variables/Variables1';
import handleSubmit from '../validation/InsRegistroSalida';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../validation/url';
import { useNavigate } from 'react-router-dom';
import { Llanta } from '@/types/llantas';

function RegistroInspeccionSalida() {
  const {
    placa, setPlaca, conductor, setConductor, sucursal, setSucursal,
    tipoVehiculo, setTipoVehiculo, odometroSalida, setOdometroSalida, 
    step, setStep, datos, setDatos
  } = Variables1();

  // Inicializar en paso 2 (selección de sucursal)
  useEffect(() => {
    setStep(2);
  }, []);

  const {
    llantas, setLlantas, observacionGeneralLlantas, setObservacionGeneralLlantas,
    actualizarLlantasPorCantidad // Cambiado de actualizarLlantasPorTipo
  } = Variables2();

  const {
    fluidos, setFluidos, observacionGeneralFluido, setObservacionGeneralFluido,
    parametrosVisuales, setParametrosVisuales, observacionGeneralVisuales, setObservacionGeneralVisuales
  } = Variables3();

  const {
    luces, setLuces, insumos, setInsumos
  } = Variables4();

  const {
    documentacion, setDocumentacion, danosCarroceria, setDanosCarroceria
  } = Variables5();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [llantasPorPlaca, setLlantasPorPlaca] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  // Obtener el mapeo de placas a cantidad de llantas
  useEffect(() => {
    const fetchLlantasPorPlaca = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/placas/get-llantas-por-placa`);
        setLlantasPorPlaca(response.data);
      } catch (error) {
        console.error('Error al obtener llantas por placa:', error);
        setLlantasPorPlaca({});
      }
    };

    fetchLlantasPorPlaca();
  }, []);

  // Actualizar llantas cuando cambia la placa
  useEffect(() => {
    if (placa && llantasPorPlaca[placa]) {
      const cantidad = llantasPorPlaca[placa];
      actualizarLlantasPorCantidad(cantidad);
    }
  }, [placa, llantasPorPlaca]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const totalSteps = 10;

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await handleSubmit({
        placa, 
        conductor, 
        sucursal, 
        tipoVehiculo, 
        odometroSalida, 
        llantas,
        observacionGeneralLlantas, 
        fluidos, 
        observacionGeneralFluido, 
        parametrosVisuales, 
        observacionGeneralVisuales, 
        luces,
        insumos, 
        documentacion, 
        danosCarroceria
      });
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener datos de placas al cargar el componente
  useEffect(() => {
    const obtenerPlacas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/placas/get-data-placas`);
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerPlacas();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">R06-PT-19 REVISION DE VEHICULOS - SALIDA</h1>

      <div className="w-full max-w-3xl bg-gray-300 rounded-full h-4 mb-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <p className="text-center text-lg font-semibold mb-4">
        Paso {step} de {totalSteps}
      </p>

      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        {step === 2 && (
          <StepDos
            sucursal={sucursal}
            setSucursal={setSucursal}
            onNext={handleNextStep}
          />
        )}

        {step === 3 && (
          <StepTres
            placa={placa} 
            setPlaca={setPlaca}
            conductor={conductor} 
            setConductor={setConductor}
            tipoVehiculo={tipoVehiculo} 
            setTipoVehiculo={setTipoVehiculo}
            odometroSalida={odometroSalida} 
            setOdometroSalida={setOdometroSalida}
            onPrevious={handlePreviousStep} 
            onNext={handleNextStep} 
            datos={datos}
            actualizarLlantasPorCantidad={actualizarLlantasPorCantidad}
          />
        )}

        {step === 4 && (
          <StepCuatro
            llantas={llantas}
            setLlantas={setLlantas}
            observacionGeneralLlantas={observacionGeneralLlantas}
            setObservacionGeneralLlantas={setObservacionGeneralLlantas}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            titulo="Revisión de Llantas"
          />
        )}
        
        {step === 5 && (
          <StepCinco
            fluidos={fluidos}
            setFluidos={setFluidos}
            observacionGeneral={observacionGeneralFluido}
            setObservacionGeneral={setObservacionGeneralFluido}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 6 && (
          <StepSeis
            parametrosVisuales={parametrosVisuales}
            setParametrosVisuales={setParametrosVisuales}
            observacionGeneralVisuales={observacionGeneralVisuales}
            setObservacionGeneralVisuales={setObservacionGeneralVisuales}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 7 && (
          <StepSiete
            luces={luces}
            setLuces={setLuces}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 8 && (
          <StepOcho
            insumos={insumos}
            setInsumos={setInsumos}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 9 && (
          <StepNueve
            documentacion={documentacion}
            setDocumentacion={setDocumentacion}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}

        {step === 10 && (
          <StepDiez
            danosCarroceria={danosCarroceria}
            setDanosCarroceria={setDanosCarroceria}
            handlePreviousStep={handlePreviousStep}
            handleSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        <a href="/falla">
          <button className="w-full mt-10 bg-green-500 text-white py-2 px-4 rounded">
            Reportar una falla
          </button>
        </a>
      </div>
    </div>
  );
}

export default RegistroInspeccionSalida;
