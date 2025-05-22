import { useState } from "react";
import { handleSubmit } from "../validation/Home";
import { useNavigate } from "react-router-dom";

function Home() {
  const [placa, setPlaca] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClear = () => {
    setPlaca("");
    setError("");
  };

  const handleCheckPlaca = async () => {
    const result = await handleSubmit(placa, setError);

    if (result.data?.rowIndex > 0) {
      localStorage.setItem("lastPlacaInfo", JSON.stringify(result.data.rowIndex));
      navigate("/registro-inspeccion-entrada");
    } else if (typeof result.data?.rowIndex === "undefined" || result.data?.rowIndex === null) {
      alert("Esta placa no esta registrada");
      navigate("/registro-inspeccion-salida");
    } else {
      alert("Error: No se pudo determinar el estado de la placa.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        R06-PT-19 REVISIÓN DE VEHÍCULOS
      </h1>
      <form
        className="w-full max-w-sm sm:max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md"
        onSubmit={(e) => e.preventDefault()}
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
            type="button"
            onClick={handleCheckPlaca}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full text-sm sm:text-base"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
