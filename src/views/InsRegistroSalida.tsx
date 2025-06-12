import React, { useEffect, useState } from 'react';
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
import { BASE_URL } from '../validation/url';
import { useNavigate } from 'react-router-dom';
import { Llanta } from '@/types/llantas';
import axios from 'axios';

function RegistroInspeccionSalida() {
  const {
    placa, setPlaca, conductor, setConductor, sucursal, setSucursal,
    tipoVehiculo, setTipoVehiculo, odometroSalida, setOdometroSalida, 
    step, setStep, datos, setDatos
  } = Variables1();

  const {
    llantas, setLlantas, observacionGeneralLlantas, setObservacionGeneralLlantas,
    actualizarLlantasPorPlaca, cantidadLlantas
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
  const navigate = useNavigate();

  useEffect(() => {
    setStep(2); // Inicializa step en 2 al cargar el componente
  }, []);

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
      // Crear array con todas las llantas posibles inicializadas como null
      const todasLasLlantas = Array(10).fill(null);
      
      // Mapear las llantas según su posición
      llantas.forEach(llanta => {
        todasLasLlantas[llanta.id - 1] = llanta;
      });

      // Filtrar según la cantidad de llantas
      let llantasFiltradas = [];
      if (cantidadLlantas === 4) {
        llantasFiltradas = [
          todasLasLlantas[0],  // ID 1
          todasLasLlantas[1],  // ID 2
          todasLasLlantas[4],  // ID 5
          todasLasLlantas[6]   // ID 7
        ];
      } else if (cantidadLlantas === 6) {
        llantasFiltradas = [
          todasLasLlantas[0],  // ID 1
          todasLasLlantas[1],  // ID 2
          todasLasLlantas[4],  // ID 5
          todasLasLlantas[5],  // ID 6
          todasLasLlantas[6],  // ID 7
          todasLasLlantas[7]   // ID 8
        ];
      } else {
        llantasFiltradas = todasLasLlantas.filter(llanta => llanta !== null);
      }

      // Eliminar posibles valores null
      llantasFiltradas = llantasFiltradas.filter(llanta => llanta !== null);

      console.log('Llantas a enviar:', llantasFiltradas); // Para depuración

      await handleSubmit({
        placa, 
        conductor, 
        sucursal, 
        tipoVehiculo, 
        odometroSalida, 
        llantas: llantasFiltradas,
        observacionGeneralLlantas, 
        fluidos, 
        observacionGeneralFluido, 
        parametrosVisuales, 
        observacionGeneralVisuales, 
        luces,
        insumos, 
        documentacion, 
        danosCarroceria,
        cantidadLlantas
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            actualizarLlantasPorPlaca={actualizarLlantasPorPlaca}
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
            cantidadLlantas={cantidadLlantas}
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
