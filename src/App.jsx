import "bootstrap/dist/css/bootstrap.min.css";
import { UserProviderComponent } from "./components/UserProviderComponent/UserProviderComponent";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/StartPage/Start";
import Test from "./pages/TestPage/Test";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/HomePage/Home";
import BabyData from "./pages/BabyDataPage/BabyData";
import Instrucciones from "./pages/InstruccionesPage/Instrucciones";
import Resultados from "./pages/ResultadosPage/Resultados";
import Contactanos from "./pages/ContactanosPage/Contactanos";
import ProtectedRoute from "./components/ProtectedRoutesComponent/ProtectedRoutesComponent";

function App() {
  return (
    <UserProviderComponent>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/test/:id" element={<ProtectedRoute><Test /></ProtectedRoute>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/babyData" element={<ProtectedRoute><BabyData /></ProtectedRoute>} />
        <Route path="/Instrucciones" element={<ProtectedRoute><Instrucciones /></ProtectedRoute>}></Route>
        <Route path="/Resultados/:idBebe" element={<ProtectedRoute><Resultados /></ProtectedRoute>}></Route>
        <Route path="/Contactanos" element={<ProtectedRoute><Contactanos /></ProtectedRoute>}></Route>
      </Routes>
    </UserProviderComponent>
  );
}

export default App;
