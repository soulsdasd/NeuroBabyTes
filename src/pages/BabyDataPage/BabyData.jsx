import { useUsuario } from "../../components/UserProviderComponent/UserProviderComponent";

import styles from "./BabyData.module.css";
import Header from '../../components/HeaderComponent/Header'
import Footer from "../../components/FooterComponent/Footer";
import DialogAddComponent from "../../components/DialogAddComponent/DialogAddComponent";
import DialogLinkComponent from "../../components/DialogLinkComponent/DialogLinkComponent";
import CircularProgress from '@mui/material/CircularProgress';

import { useCallback, useEffect, useState } from "react";
import { FaBaby } from "react-icons/fa";
import { supabase } from "../../supabaseClient";

import { useNavigate } from "react-router-dom";

export default function BabyData() {
  const navigate = useNavigate();
  const {usuario, loading} = useUsuario();

  const [bebes, setBebes] = useState([]);

  const [mensajePantalla, setMensajePantalla] = useState('');


  const goTest = (idBebe) => {
    navigate(`/Test/${idBebe}`);
  };
    const goResult = (idBebe) => {
    navigate(`/Resultados/${idBebe}`);
  };

  const fetchBebes = useCallback(async () => {
    console.log("usuario: ",usuario );
    if(!usuario.id_perfil || !usuario.rol_perfil) return;
    console.log("Rol: ", usuario.rol_perfil)
    if(usuario.rol_perfil == "tutor"){
      const { data, error } = await supabase
      .from("bebe")
      .select("*")
      .order("id_bebe", { ascending: true })
      .eq('id_perfil', usuario.id_perfil);
    setBebes(data);
    if (error) {
      console.log("Error al obtener datos de la tabla bebe: ", error);
    }
    if(data.length == 0){
      setMensajePantalla('Actualmente no hay pacientes registrados. Utilice el botón en la esquina inferior derecha para añadir uno.');
    }
    }else if(usuario.rol_perfil == "fisioterapeuta"){
      const { data, error } = await supabase
        .from("vincular_bebe")
        .select(`
          id_vincular, 
          id_perfil,
          id_bebe,
          bebe(
            id_bebe,
            nombre_bebe,
            meses_bebe,
            peso_bebe,
            estatura_bebe,
            genero
          )
        `)
        .eq("id_perfil", usuario.id_perfil)
        .order("id_bebe", { ascending: true });
    setBebes(data);
    if (error) {
      console.log("Error al obtener datos de la tabla bebe: ", error);
    }
    if(data.length == 0){
      setMensajePantalla('Actualmente no hay pacientes registrados. Utilice el botón en la esquina inferior derecha para añadir uno.');
    }
    }
  }, [usuario])

  useEffect(() => {
    fetchBebes();
  }, [fetchBebes]);

  if (loading || !usuario) {
    return <p>Cargando usuario...</p>; // o un spinner
  }
  return (
    <>
      <div className={styles.pageContainer}>
        <Header></Header>
        {(usuario.rol_perfil == undefined || usuario.rol_perfil == null) && (
          <div className={styles.loadingContainer}>
            <CircularProgress size="3rem" />
          </div>
        )}
        <div className={styles.mainContainer}>
          <p>{mensajePantalla}</p>
          {usuario.rol_perfil === "tutor" ? bebes.map((bebe, index) => (
            <div key={index} className={styles.cardContainer}>
                <div className={styles.cardHeader}>
                  {bebe.genero === "masculino" ? (
                    <FaBaby size={40} style={{ color: "#A7D7F9", marginBottom: "10px" }} />
                  ) : (
                    <FaBaby size={40} style={{ color: "#f3acdf", marginBottom: "10px" }} />
                  )}
                  <h3>{bebe.nombre_bebe}</h3>
                </div>
                <div className={styles.cardBody}>
                  <h4>Meses: {bebe.meses_bebe}</h4>
                  <h5>UUID: {bebe.id_bebe}</h5>
                  <p>Peso: {bebe.peso_bebe} kg</p>
                  <p>Estatura: {bebe.estatura_bebe} cm</p>
                  <div className={styles.buttonContainer}>
                  <button className={styles.addButton} onClick={() => goTest(bebe.id_bebe)}>
                    Agregar Registro
                  </button>
                  <button className={styles.addButton} onClick={() => goResult(bebe.id_bebe)}>
                    Mostrar resultados
                  </button>
                </div>
              </div>
            </div>
          )) : bebes.map((vinculo, index) => (
            <div key={index} className={styles.cardContainer}>
              <div className={styles.cardHeader}>
                {vinculo.bebe.genero === "masculino" ? (
                  <FaBaby size={40} style={{ color: "#A7D7F9", marginBottom: "10px" }} />
                ) : (
                  <FaBaby size={40} style={{ color: "#f3acdf", marginBottom: "10px" }} />
                )}
                <h3>{vinculo.bebe.nombre_bebe}</h3>
              </div>
              <div className={styles.cardBody}>
                <h4>Meses: {vinculo.bebe.meses_bebe}</h4>
                <h5>UUID: {vinculo.bebe.id_bebe}</h5>
                <p>Peso: {vinculo.bebe.peso_bebe} kg</p>
                <p>Estatura: {vinculo.bebe.estatura_bebe} cm</p>
                <div className={styles.buttonContainer}>
                  <button className={styles.addButton} onClick={() => goTest(vinculo.bebe.id_bebe)}>
                    Agregar Registro
                  </button>
                  <button className={styles.addButton} onClick={() => goResult(vinculo.bebe.id_bebe)}>
                    Mostrar resultados
                  </button>
                </div>
              </div>
            </div>
          ))}

          {usuario.rol_perfil == "fisioterapeuta" ? (
            <DialogLinkComponent />
          ) : usuario.rol_perfil == "tutor" && (
            <DialogAddComponent />
          )}

        </div>
          <Footer />
        </div>
    </>
  );
}
