import { useNavigate } from "react-router-dom";
import styles from "./Resultados.module.css";

export default function Instrucciones() {
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

      <div className={styles.resultadoscontainer}></div>

      <div className={styles.containerflotter}>
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
