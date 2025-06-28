import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient';
import SelectPeriodoComponent from "../SelectPeriodoComponent/SelectPeriodoComponent";

import Styles from './TallasForm.module.css'
import { TextField, Button} from '@mui/material';

import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';



function TallasForm({id_bebe}){
    const [isData, setIsData] = useState(false);
    const [message, setMessage] = useState('');

    const [pc, setPc] = useState('');
    const [talla, setTalla] = useState('');
    const [peso, setPeso] = useState('');
    const [coloracion, setColoracion] = useState('');
    const [pdn, setPdn] = useState('');
    const [tonoMuscular, setTonoMuscular] = useState('');
    const [tonoPostural, setTonoPostural] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [periodoGuardado, setPeriodoGuardado] = useState('');

    const parseFloatOrNull = (val) => val !== '' && val !== undefined ? parseFloat(val) : null;
    const parseIntOrNull = (val) => val !== '' && val !== undefined ? parseInt(val) : null;
    

    useEffect(() => {
        if (!id_bebe) return;

        async function fetchDatos() {
            let query = supabase.from('neurodesarrollo').select('*').eq('id_bebe', id_bebe);

            if (periodo) {
            query = query.eq('periodo', periodo);
            }

            const { data, error } = await query.single();

            if (error) {
                if (error.code === 'PGRST116' || error.details?.includes('No rows found')) {
                    setIsData(false);
                    setPeriodoGuardado('');
                    setPc('');
                    setTalla('');
                    setPeso('');
                    setColoracion('');
                    setPdn('');
                    setTonoMuscular('');
                    setTonoPostural('');
                    console.log("No hay datos previos");
                } else {
                    console.log('Error al cargar datos:', error.message);
                }
            } else if (data) {
            setPc(String(data.pc ?? ''));
            setTalla(String(data.talla ?? ''));
            setPeso(String(data.peso ?? ''));
            setColoracion(data.coloracion ?? '');
            setPdn(data.pdn ?? '');
            setTonoMuscular(data.tono_muscular ?? '');
            setTonoPostural(data.tono_postural ?? '');
            setPeriodo(data.periodo ?? '');
            setIsData(true);
            }
        }

        fetchDatos();
    }, [id_bebe, periodo]);

    const saveOrUpdateChanges = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        setMessage('Error al obtener el usuario: ' + error.message);
        return;
    }
    if (!data || !data.user) {
        setMessage('Registro fallido. Intenta de nuevo.');
        return;
    }

    if (isData && periodo === periodoGuardado) {
        // actualizar
        const { error: updateError } = await supabase
        .from('neurodesarrollo')
        .update({
            pc: parseIntOrNull(pc),
            talla: parseIntOrNull(talla),
            peso: parseFloatOrNull(peso),
            coloracion,
            pdn,
            tono_muscular: tonoMuscular,
            tono_postural: tonoPostural,
            periodo
        })
        .eq('id_bebe', id_bebe)
        .eq('periodo', periodo);

        if (updateError) {
        setMessage(`Error al actualizar los datos: ${updateError.message}`);
        } else {
        setMessage('¡Datos actualizados exitosamente!');
        }
    } else {
        // insertar
        const { error: insertError } = await supabase
        .from('neurodesarrollo')
        .insert([{
            id_bebe,
            pc: parseIntOrNull(pc),
            talla: parseIntOrNull(talla),
            peso: parseFloatOrNull(peso),
            coloracion,
            pdn,
            tono_muscular: tonoMuscular,
            tono_postural: tonoPostural,
            periodo
        }]);

        if (insertError) {
        setMessage(`Error al insertar en la tabla: ${insertError.message}`);
        } else {
        setMessage('¡Datos ingresados exitosamente!');
        setIsData(true);
        setPeriodoGuardado(periodo);
        }
    }
    };

    return(
        <>  
            <div className={Styles.mainContainer}>
                <SelectPeriodoComponent opcion={periodo} setOpcion={setPeriodo} apartado={'tono'}/>
                <div className={Styles.textContainer}>
                    <h5>Tallas</h5>
                </div>                
                <div className={Styles.formGroup}>
                    <div>
                        <TextField value={pc} label='PC (cm)' type="number" onChange={(e) => setPc(e.target.value)}/>
                        <TextField value={talla} label="Talla (cm)" type="number" onChange={(e) => setTalla(e.target.value)}/>
                        <TextField value={peso} label="Peso (kg)" type="number" onChange={(e) => setPeso(e.target.value)}/>
                    </div>
                </div>
                <div className={Styles.textContainer}>
                    <h5>Coloración</h5>
                </div>
                <RadioGroup
                    value={coloracion}
                    onChange={(e) => setColoracion(e.target.value)}
                    >
                    <FormControlLabel value="amarillo" control={<Radio />} label="Amarillo" />
                    <FormControlLabel value="cianotico" control={<Radio />} label="Cianotico" />
                    <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                </RadioGroup>

                <div className={Styles.textContainer}>
                    <h5>PDN</h5>
                </div>
                <RadioGroup
                    value={pdn}
                    onChange={(e) => setPdn(e.target.value)}
                    >
                    <FormControlLabel value="3-5" control={<Radio />} label="3-5 PDN" />
                    <FormControlLabel value="6-9" control={<Radio />} label="6-9 ARDN" />
                    <FormControlLabel value="10>" control={<Radio />} label="10> PRND" />
                </RadioGroup>

                <div className={Styles.textContainer}>
                    <h5>Tono muscular</h5>
                </div>
                <RadioGroup
                    value={tonoMuscular}
                    onChange={(e) => setTonoMuscular(e.target.value)}
                    >
                    <FormControlLabel value="hipertonico" control={<Radio />} label="Hipertonico" />
                    <FormControlLabel value="hipotonico" control={<Radio />} label="Hipotonico" />
                    <FormControlLabel value="isotonico" control={<Radio />} label="Isotonico" />
                </RadioGroup>
                
                <div className={Styles.textContainer}>
                    <h5>Tono postular</h5>
                </div>
                <RadioGroup
                    value={tonoPostural}
                    onChange={(e) => setTonoPostural(e.target.value)}
                    >
                    <FormControlLabel value="rigidez" control={<Radio />} label="Rigidez" />
                    <FormControlLabel value="espastica" control={<Radio />} label="Espastica" />
                    <FormControlLabel value="neutro" control={<Radio />} label="Neutro" />
                </RadioGroup>
                    <button className={Styles.saveButton} type="button" onClick={saveOrUpdateChanges}>
                        Guardar cambios
                    </button>
                <p>{message}</p>
            </div>
            
        </>
    );
}

export default TallasForm;