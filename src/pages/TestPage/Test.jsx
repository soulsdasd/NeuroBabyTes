// src/App.jsx
import Styles from './Test.module.css'

import PrenatalForm from '../../components/PrenatalForm';
import PerinatalForm from '../../components/PerinatalForm';
import PostnatalForm from '../../components/PostnatalComponent/PostnatalForm';
import TallasForm from '../../components/TallasForm/TallasForm';
import Header from '../../components/HeaderComponent/Header';
import Footer from '../../components/FooterComponent/Footer';

import { SlArrowDown } from "react-icons/sl";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReflejosArcaicosForm from '../../components/ReflejosAracaicosComponent/ReflejosArcaicosForm';
import ReflejosPrimerForm from '../../components/ReflejosPrimerComponent/ReflejosPrimerForm';
import ReflejosSegundoForm from '../../components/ReflejosSegundoComponent/ReflejosSegundoComponent';
import { supabase } from '../../supabaseClient';

function Prueba() {
    //const [mama, setMama] = useState([]);
    //const [valor, setValor] = useState('');
    const [isOpenPrenatal, setIsOpenPrenatal] = useState(false);
    const [isOpenPerinatal, setIsOpenPerinatal] = useState(false);
    const [isOpenPostnatal, setIsOpenPostnatal] = useState(false);
    const [isOpenTallaColoracion, setIsOpenTallaColoracion] = useState(false);
    const [isOpenReflejosArcaicos, setIsOpenReflejosArcaicos] = useState(false);
    const [isOpenReflejosPrimer, setIsOpenReflejosPrimer] = useState(false);
    const [isOpenReflejosSegundo, setIsOpenReflejosSegundo] = useState(false);
    const [userId, setUserId] = useState("");
    const [perfil, setPerfil] = useState("");
    const { id } = useParams();

    useEffect(() => {
    const getUser = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if(userError || !userData?.user){
        console.log("Error al obtener los datos del usuario: ", userError);
        }else{
        console.log("Datos obtenidos exitosamente");
        setUserId(userData.user.id);
        }
    };
    getUser();
    }, []);

      useEffect(() =>  {
        const getPerfil = async () => {
            console.log(userId)
            if(!userId) return;
    
            const {data, error} = await supabase
            .from("perfiles")
            .select("id_perfil, nombre_perfil, rol_perfil")
            .eq('id_perfil', userId)
            .single();
    
            if(error){
                console.log("Error al obtener los datos: ", error);
            }else{
                setPerfil(data);
                console.log("Perfil: ", data)
            }
        };
        getPerfil();
      }, [userId])

    return (
        <>
            <Header />
            <div className={Styles.mainContainer}>      
            {(perfil.rol_perfil == "fisioterapeuta" || perfil.rol_perfil == "tutor") && (
                <>
                    {/* Prenatales */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenPrenatal(!isOpenPrenatal)}>
                        <h3>Durante el embarazo (Prenatal)</h3> 
                        <SlArrowDown className={`${Styles.iconHeader} ${!isOpenPrenatal ? Styles.rotated : ''}`}  />
                    </div>
                    {isOpenPrenatal && (
                    <div className={Styles.formContainer}>
                        <PrenatalForm id_bebe={id}/>
                    </div>
                    )}
                    </div>
                    {/* Perinatales */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenPerinatal(!isOpenPerinatal)}>
                            <h3>Durante el parto (Perinatal)</h3> 
                            <SlArrowDown className={`${Styles.iconHeader} ${!isOpenPerinatal ? Styles.rotated : ''}`}  />
                        </div>
                        {isOpenPerinatal && (
                        <div className={Styles.formContainer}>
                            <PerinatalForm id_bebe={id}/>
                        </div>
                        )}
                    </div>
                    {/* Postnatales */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenPostnatal(!isOpenPostnatal)}>
                            <h3>Primeros dias del bebe (Postnatal)</h3> 
                            <SlArrowDown className={`${Styles.iconHeader} ${!isOpenPostnatal ? Styles.rotated : ''}`}  />
                        </div>
                        {isOpenPostnatal && (
                        <div className={Styles.formContainer}>
                            <PostnatalForm id_bebe={id}/>
                        </div>
                        )}
                    </div>
                </> 
            )} {perfil.rol_perfil == "fisioterapeuta" && (
                <>
                    {/* Talla y coloración */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenTallaColoracion(!isOpenTallaColoracion)}>
                            <h3>Talla y coloración</h3> 
                            <SlArrowDown className={`${Styles.iconHeader} ${!isOpenTallaColoracion ? Styles.rotated : ''}`}  />
                        </div>
                        {isOpenTallaColoracion && (
                        <div className={Styles.formContainer}>
                            <TallasForm id_bebe={id}/>
                        </div>
                        )}
                    </div>
                    {/* Reflejos arcaicos */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenReflejosArcaicos(!isOpenReflejosArcaicos)}>
                            <h3>Reflejos arcaicos</h3> 
                            <SlArrowDown className={`${Styles.iconHeader} ${!isOpenReflejosArcaicos ? Styles.rotated : ''}`}  />
                        </div>
                        {isOpenReflejosArcaicos && (
                        <div className={Styles.formContainer}>
                            <ReflejosArcaicosForm id_bebe={id}/>
                        </div>
                        )}
                    </div>
                    {/* Reflejos de primer nivel */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenReflejosPrimer(!isOpenReflejosPrimer)}>
                            <h3>Reflejos de primer nivel</h3> 
                            <SlArrowDown className={`${Styles.iconHeader} ${!isOpenReflejosPrimer ? Styles.rotated : ''}`}  />
                        </div>
                        {isOpenReflejosPrimer && (
                        <div className={Styles.formContainer}>
                            <ReflejosPrimerForm id_bebe={id}/>
                        </div>
                        )}
                    </div>
                    {/* Reflejos de segundo nivel */}
                    <div className={Styles.cardContainer}>
                        <div className={Styles.headerContainer} onClick={() => setIsOpenReflejosSegundo(!isOpenReflejosSegundo)}>
                            <h3>Reflejos de segundo nivel</h3> 
                            <SlArrowDown className={`${Styles.iconHeader} ${!isOpenReflejosSegundo ? Styles.rotated : ''}`}  />
                        </div>
                        {isOpenReflejosSegundo && (
                        <div className={Styles.formContainer}>
                            <ReflejosSegundoForm id_bebe={id}/>
                        </div>
                        )}
                    </div>
                </>
            )}          
            </div>
            <Footer />
        </>
    );
}

export default Prueba;
