import styles from "./Home.module.css";
import baby from "../../assets/baby.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.containerHeader}>
        <div className={styles.logo}>NeuroBaby</div>
        <div className={styles.navLinks}>
          <button className={styles.btnmain} onClick={() => navigate("/Home")}>
            Inicio
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/Instrucciones")}>
            Instrucciones
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/babyData")}>
            Test
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/Resultados")}>
            Resultados
          </button>
          <button
            className={styles.btnmain}
            onClick={() => navigate("/Contactanos")}>
            Contactanos
          </button>
        </div>
      </div>

      <div className={styles.bodycontainer}>
        <img src={baby} alt="baby" className={styles.babypicture} />
        <b>
          <p className={styles.titlewelcome}>Bienvenido al test Neurobaby</p>
        </b>
        <p>
          "Bienvenido al Sistema para Evaluar el Neurodesarrollo, una
          herramienta interactiva diseñada para registrar, monitorear y evaluar
          el crecimiento físico, cognitivo y emocional de tu bebé. <br /> A
          través de esta plataforma, padres y profesionales pueden detectar a
          tiempo posibles alteraciones en el desarrollo y tomar decisiones
          informadas para asegurar el bienestar del infante."
        </p>
        <button className={`btn btn-light ${styles.btnstart}`} type="button">
          Iniciar
        </button>
      </div>

      <div className={styles.containerend}>
        <p>
          <b className={styles.text}>
            NeuroBabyTest <br />
          </b>
          Empoderar a los padres con conocimiento
        </p>
        <div className={styles.navLinks}>
          <a>Politicas de Privacidad</a>
          <a>Politicas de Servicio</a>
          <a>Soporte</a>
        </div>
      </div>
    </>
  );
}
