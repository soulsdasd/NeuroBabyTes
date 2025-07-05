import { useUsuario } from "../UserProviderComponent/UserProviderComponent";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";
import { supabase } from "../../supabaseClient";
import logo from "../../assets/logo.png"
import { useMatch, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const {usuario, loading} = useUsuario();
  const matchResultados = useMatch("/Resultados/:id");
  const matchTest = useMatch("/Test/:id")
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      localStorage.removeItem("usuario");
      navigate("/login"); // redirige al login o página de inicio
    }
  };

  return (
    <div className={Styles.containerHeader}>
      {/* Logo  */}
      <img
        src={logo}
        alt="logo"
        className={Styles.logo}
        onClick={() => navigate("/Home")}
      />

      {/* Menú */}
      <div className={Styles.navLinks}>
        <button
          className={`${Styles.btnMain} ${
            location.pathname === "/Home" ? Styles.active : ""
          }`}
          onClick={() => navigate("/Home")}>
          Inicio
        </button>
        <button
          className={`${Styles.btnMain} ${
            location.pathname === "/Instrucciones" ? Styles.active : ""
          }`}
          onClick={() => navigate("/Instrucciones")}>
          Instrucciones
        </button>
        <button
          className={`${Styles.btnMain} ${
            (location.pathname === "/babyData" || matchResultados || matchTest) ? Styles.active : ""
          }`}
          onClick={() => navigate("/babyData")}>
          Pacientes
        </button>
        <button
          className={`${Styles.btnMain} ${
            location.pathname === "/Contactanos" ? Styles.active : ""
          }`}
          onClick={() => navigate("/Contactanos")}>
          Contactanos
        </button>
      </div>

      {/* Usuario */}
      <div className={Styles.userContainer}>
        <button className={Styles.btnUser}>
          {usuario?.nombre_perfil || "Usuario"}
        </button>
        <button className={Styles.btnLogOut} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
