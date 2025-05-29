import { useState } from "react";
import { handleSubmit } from "../validation/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../validation/url";

function Home() {
  const [placa, setPlaca] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => {
    setPlaca("");
    setError("");
  };

  const checkPlacaExists = async (placa: string): Promise<boolean> => {
    try {
      const response = await axios.get<string[]>(`${BASE_URL}/placas/get-data-placas`);
      const placasList = response.data
        .map((p: string) => p?.toString().trim().toUpperCase())
        .filter((p: string) => p);
      return placasList.includes(placa.trim().toUpperCase());
    } catch (error) {
      console.error("Error al verificar placa:", error);
      return false;
    }
  };
  
  const handleCheckPlaca = async () => {
    if (!placa.trim()) {
      setError("El campo de placa es obligatorio.");
      return;
    }

    setIsChecking(true);
    setError("");

    try{
      // Primero verificar si la placa existe en la lista
      const placaExists = await checkPlacaExists(placa);
      
      if (!placaExists) {
        setError("Esta placa no está registrada en el sistema.");
        setIsChecking(false);
        return;
      }

      // Si existe, proceder con la lógica actual  
      const result = await handleSubmit(placa, setError);
  
      if (result.data?.rowIndex > 0) {
        localStorage.setItem("lastPlacaInfo", JSON.stringify({ rowIndex: result.data.rowIndex, placa: placa}) // Guarda la placa junto al índice    
      );
          if (result.data?.estado === "entrada"){
          navigate("/registro-inspeccion-entrada");
        } else {
          alert("Esta placa no esta registrada");
          navigate("/registro-inspeccion-salida");
          }
        {/*} else {
        // Si no hay rowIndex pero la placa existe, ir a registro salida
        navigate("/registro-inspeccion-salida");
        //alert("Error: No se pudo determinar el estado de la placa.");*/}
      }
    }catch (error) {
      console.error("Error:", error);
      setError("Ocurrió un error al procesar la placa.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        R06-PT-19 REVISIÓN DE VEHÍCULOS
      </h1>
      <form
        className="w-full max-w-sm sm:max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckPlaca();
        }}
      >
        <label className="block mb-4">
          <span className="text-gray-700">Ingrese su placa: </span>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className={`mt-1 p-2 border rounded w-full text-sm sm:text-base ${error ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Ingrese su placa"
            required
          />
        </label>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full text-sm sm:text-base"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleCheckPlaca}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full text-sm sm:text-base"
            disabled={isChecking}
          >
            {isChecking ? 'Verificando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
