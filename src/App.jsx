import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/StartPage/Start";
import Test from "./pages/TestPage/Test";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/HomePage/Home";
import BabyData from "./pages/BabyDataPage/BabyData";
import Instrucciones from "./pages/Instrucciones/Instrucciones";
import Resultados from "./pages/Resultados/Resultados";
import Contactanos from "./pages/Contactanos/Contactanos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/babyData" element={<BabyData />} />
      <Route path="/Instrucciones" element={<Instrucciones />}></Route>
      <Route path="/Resultados" element={<Resultados />}></Route>
      <Route path="/Contactanos" element={<Contactanos />}></Route>
    </Routes>
  );
}

export default App;
