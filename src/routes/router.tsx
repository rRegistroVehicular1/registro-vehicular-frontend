import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import RegistroInspeccionSalida from "../views/InsRegistroSalida";
import RegistroInspeccionEntrada from "../views/InsRegistroEntrada";
import Falla from "../views/Falla";
import Salidas from "../views/Salidas";



const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/registro-inspeccion-salida", element: <RegistroInspeccionSalida /> },
  { path: "/registro-inspeccion-entrada", element: <RegistroInspeccionEntrada /> },
  { path: "/falla", element: <Falla /> },
  { path: "/salidas", element: <Salidas /> }
]);

export default router;



