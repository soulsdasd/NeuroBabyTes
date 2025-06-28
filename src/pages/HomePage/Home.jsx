import styles from "./Home.module.css";
import baby from "../../assets/baby.png";

import Header  from "../../components/HeaderComponent/Header";
import Footer from '../../components/FooterComponent/Footer'
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goInstrucciones = () => {
      navigate(`/Instrucciones`);
  };
  return (
    <>
      <Header></Header>
      <div className={styles.bodycontainer}>
        <img src={baby} alt="baby" className={styles.babypicture} />
        <b>
          <p className={styles.titlewelcome}>Bienvenido al test Neurobaby</p>
        </b>
        <p>
          Bienvenido al Sistema para Evaluar el Neurodesarrollo, una
          herramienta interactiva diseñada para registrar, monitorear y evaluar
          el crecimiento físico, cognitivo y emocional de tu bebé. <br /> A
          través de esta plataforma, padres y profesionales pueden detectar a
          tiempo posibles alteraciones en el desarrollo y tomar decisiones
          informadas para asegurar el bienestar del infante.
        </p>
        <button className={`btn btn-light ${styles.btnstart}`} type="button" onClick={goInstrucciones}>
          Iniciar
        </button>
      </div>
      <Footer />
    </>
  );
}
