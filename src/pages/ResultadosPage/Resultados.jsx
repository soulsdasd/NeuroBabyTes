import styles from "./Resultados.module.css";
import { supabase } from "../../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer";

import { PieChart } from "@mui/x-charts/PieChart";

export default function Resultados() {
  const navigate = useNavigate();
  const { idBebe } = useParams();
  console.log("Id bebe: ", idBebe);
  const [pieData, setPieData] = useState([]);
  const [factorRiesgo, setFactorRiesgo] = useState("");
  const [recomendacion, setRecomendacion] = useState("");

  function goContacto(){
    navigate("/Contactanos");
  }

  function calcularPDN(total){
    console.log("Total: ", total)
    if(total >= 3 && total <= 5){
      setFactorRiesgo("PDN: "+total);
      setRecomendacion("Solo es necesario hacer seguimiento");
    }else if(total>=6 && total <= 9){
      setFactorRiesgo("ARDN: "+total);
      setRecomendacion("Es necesario hacer estudios especializados");
    }else{
      setFactorRiesgo("PRND: "+total);
      setRecomendacion("Se requiere atención inmediata");
    }
  }

  useEffect(() => {
    if (!idBebe) return;

    const obtenerResultados = async () => {
      try {
        const [prenatal, perinatal, postnatal] = await Promise.all([
          supabase.rpc('suma_prenatal', { uid_bebe: String(idBebe) }),
          supabase.rpc('suma_perinatal', { uid_bebe: String(idBebe) }),
          supabase.rpc('suma_postnatal', { uid_bebe: String(idBebe) }),
        ]);

        const prenatalCount = prenatal.data ?? 0;
        const perinatalCount = perinatal.data ?? 0;
        const postnatalCount = postnatal.data ?? 0;

        console.log("Conteo total: ", prenatalCount, perinatalCount, postnatalCount);

        const totalMax = 28;
        const total = prenatalCount + perinatalCount + postnatalCount;
        calcularPDN(total);
        const restante = Math.max(totalMax - total, 0);

        setPieData([
          { id: 0, value: prenatalCount, label: "Riesgo prenatal", color: "#3f51b5" },
          { id: 1, value: perinatalCount, label: "Riesgo perinatal", color: "#f50057" },
          { id: 2, value: postnatalCount, label: "Riesgo postnatal", color: "#ff9800" },
          { id: 3, value: restante, label: "Fuera de riesgo", color: "gray" },
        ]);
      } catch (error) {
        console.error("Error al obtener resultados:", error);
      }
    };

    obtenerResultados();
  }, [idBebe]);

  return (
    <>
      <Header />

      <div className={styles.mainContainer}>
        <div className={styles.pieContainer}>
          <div className={styles.infoContainer}>
            <p>PDN: Posible daño neurologico</p>
            <p>ARDN: Alto riesgo de daño neurologico</p>
            <p>PRND: Presunción de daño neurologico definitivo</p>
          </div>
          <div className={styles.chartContainer}>
            <h2>Factores de riesgo</h2>
            <h4>{factorRiesgo}</h4>
            <p className={styles.recomendacionContainer}>{recomendacion} <span className={styles.contactoLink} onClick={goContacto}>Contacta a un profesional</span></p>
            {pieData.length > 0 && (
              <PieChart
                series={[
                  {
                    data: pieData,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  },
                ]}
                height={400}
                width={400}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
