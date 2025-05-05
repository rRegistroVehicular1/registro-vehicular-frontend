type Step2Props = {
    placa: string;
    setPlaca: (value: string) => void;
    conductor: string;
    setConductor: (value: string) => void;
    tipoVehiculo: string;
    setTipoVehiculo: (value: string) => void;
    odometroSalida: string;
    setOdometroSalida: (value: string) => void;
    onPrevious: () => void;
    onNext: () => void;
    datos: string[];
}

function StepDos({ placa, setPlaca, conductor, setConductor, tipoVehiculo, setTipoVehiculo, odometroSalida, setOdometroSalida, onPrevious, onNext, datos }: Step2Props) {

    const validateStep2 = () => {
        if (!placa || !conductor || !tipoVehiculo || !odometroSalida) {
            alert('Todos los campos de este paso son obligatorios.');
            return false;
        }
        return true;
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block mb-4">
                Placa del Vehículo:
                <select
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                >
                    <option value="">Seleccione una placa</option>
                    {datos.map((placa, index) => (
                        <option key={index} value={placa}>
                            {placa}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block mb-4">
                Nombre del Conductor:
                <input
                    type="text"
                    value={conductor}
                    onChange={(e) => setConductor(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                />
            </label>

            <label className="block mb-4">
                Tipo de Vehículo:
                <select
                    value={tipoVehiculo}
                    onChange={(e) => {setTipoVehiculo(e.target.value);
                        // Resetear las llantas al cambiar tipo
                        setLlantasParte1(initialLlantasParte1(e.target.value));
                        setLlantasParte2(initialLlantasParte2(e.target.value));
                    }}
                    className="mt-1 p-2 border rounded w-full"
                    required
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="sedan">Sedán</option>
                    <option value="pickup">Pickup</option>
                    <option value="panel">Panel</option>
                    <option value="camion">Camión</option>
                </select>
            </label>

            <label className="block mb-4">
                Odómetro de Salida:
                <input
                    type="text"
                    value={odometroSalida}
                    onChange={(e) => setOdometroSalida(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                />
            </label>

            <div className="col-span-1 md:col-span-2 flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onPrevious}>
                    Atrás
                </button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                    if (validateStep2()) {
                        onNext();
                    }
                }}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default StepDos;
