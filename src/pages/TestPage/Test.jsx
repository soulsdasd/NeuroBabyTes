// src/App.jsx
import Styles from './Test.module.css'

import PrenatalForm from '../../components/PrenatalForm';
import PerinatalForm from '../../components/PerinatalForm';

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { SlArrowDown } from "react-icons/sl";

import { useState } from 'react';
import { useParams } from 'react-router-dom';
//import { supabase } from '../supabaseClient';

function Prueba() {
    //const [mama, setMama] = useState([]);
    //const [valor, setValor] = useState('');
    const [isOpenPrenatal, setIsOpenPrenatal] = useState(false);
    const [isOpenPerinatal, setIsOpenPerinatal] = useState(false);
    

    const { id } = useParams();

    return (
        <>
            <div className={Styles.mainContainer}>
                <div className={Styles.cardContainer}>
                    <div className={Styles.headerContainer} onClick={() => setIsOpenPrenatal(!isOpenPrenatal)}>
                    <h3>Prenatales</h3> 
                    <SlArrowDown className={`${Styles.iconHeader} ${!isOpenPrenatal ? Styles.rotated : ''}`}  />
                </div>
                {isOpenPrenatal && (
                <div className={Styles.formContainer}>
                    <PrenatalForm id_bebe={id}/>
                </div>
                )}
                </div>

                <div className={Styles.headerContainer} onClick={() => setIsOpenPerinatal(!isOpenPerinatal)}>
                    <h3>Perinatales</h3> 
                    <SlArrowDown className={`${Styles.iconHeader} ${!isOpenPerinatal ? Styles.rotated : ''}`}  />
                </div>
                {isOpenPerinatal && (
                <div className={Styles.formContainer}>
                    <PerinatalForm id_bebe={id}/>
                </div>
                )}
            </div>
        </>
    );
}

export default Prueba;
