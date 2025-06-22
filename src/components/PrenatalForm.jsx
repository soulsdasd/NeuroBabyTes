import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import {
    FormControl,
} from '@mui/material';

import RadioForm from '../components/RadioForm';

import styles from '../pages/SignUpPage/SignUp.module.css';

function PrenatalesForm({id_bebe}) {
    const [mensaje, setMensaje] = useState('');
    const [planeacion, setPlaneacion] = useState('');
    const [enfermedades_degenerativas, setEnfermedadesDegenerativas] = useState('');
    const [abortos, setAbortos] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [depresion_ansiedad, setDepresionAnsiedad] = useState('');
    const [drogas, setDrogas] = useState('');
    const [desnutricion, setDesnutricion] = useState('');
    const [caidas, setCaidas] = useState('');
    const [maltrato_fisico, setMaltratoFisico] = useState('');
    const [problema_genetico, setProblemaGenetico] = useState('');
    const [diabetes_gestacional, setDiabetesGestacional] = useState('');
    const [preclamsia, setPreclamsia] = useState('');
    const [eclampsia, setEclampsia] = useState('');
    const [ets, setEts] = useState('');
    const [desprendimiento, setDesprendimiento] = useState('');
    const [abrupto_placenta, setAbruptoPlacenta] = useState('');

    const [isData, setIsData] = useState(false);

    useEffect(() => {
      async function fetchDatos() {
      const { data, error } = await supabase
        .from('prenatal')
        .select('*')
        .eq('id_bebe', id_bebe)
        .single();

      if (error) {
        console.log('Error al cargar datos prenatales:', error.message);
      } else if (data) {
        setPlaneacion(String(data.planeacion));
        setEnfermedadesDegenerativas(String(data.enfermedades_degenerativas));
        setAbortos(String(data.abortos));
        setAlcohol(String(data.alcohol));
        setDepresionAnsiedad(String(data.depresion_ansiedad));
        setDrogas(String(data.drogas));
        setDesnutricion(String(data.desnutricion));
        setCaidas(String(data.caidas));
        setMaltratoFisico(String(data.maltrato_fisico));
        setProblemaGenetico(String(data.problema_genetico_hereditario));
        setDiabetesGestacional(String(data.diabetes_gestacional));
        setPreclamsia(String(data.preclamsia));
        setEclampsia(String(data.eclampsia));
        setEts(String(data.ets));
        setDesprendimiento(String(data.desprendimiento));
        setAbruptoPlacenta(String(data.abrupto_placenta));
        setIsData(true);
      }
  }

  fetchDatos();
}, [id_bebe]);

    const saveChanges = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            setMensaje('Error al obtener el usuario: ' + error.message);
            return;
        }
        // Verificamos que data y user existan
        if (data && data.user) {
            const userId = data.user.id;
            console.log(userId);
            const { error: insertError } = await supabase
                .from('prenatal')
                .insert([{ id_bebe: id_bebe, planeacion: planeacion, enfermedades_degenerativas: enfermedades_degenerativas, abortos: abortos,alcohol: alcohol, depresion_ansiedad: depresion_ansiedad, drogas: drogas, desnutricion: desnutricion, caidas: caidas, maltrato_fisico: maltrato_fisico, problema_genetico_hereditario: problema_genetico, diabetes_gestacional: diabetes_gestacional, preclamsia: preclamsia, eclampsia: eclampsia, ets: ets, desprendimiento: desprendimiento, abrupto_placenta: abrupto_placenta}]);
        
            if (insertError) {
                setMensaje(`Error al insertar en la tabla: ${insertError.message}`);
            } else {
                setMensaje('¡Datos ingresados exitosamente!.');
            }
        } else {
            setMensaje('Registro fallido. Intenta de nuevo.');
        }
    }

    const updateChanges = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            setMensaje('Error al obtener el usuario: ' + error.message);
            return;
        }
        // Verificamos que data y user existan
        if (data && data.user) {
            const userId = data.user.id;
            console.log(userId);
            const { error: updateError } = await supabase
                .from('prenatal')
                .update({planeacion: planeacion, enfermedades_degenerativas: enfermedades_degenerativas, abortos: abortos,alcohol: alcohol, depresion_ansiedad: depresion_ansiedad, drogas: drogas, desnutricion: desnutricion, caidas: caidas, maltrato_fisico: maltrato_fisico, problema_genetico_hereditario: problema_genetico, diabetes_gestacional: diabetes_gestacional, preclamsia: preclamsia, eclampsia: eclampsia, ets: ets, desprendimiento: desprendimiento, abrupto_placenta: abrupto_placenta})
                .eq('id_bebe', id_bebe);

            if (updateError) {
                setMensaje(`Error al actualizar los datos: ${updateError.message}`);
            } else {
                setMensaje('¡Datos actualizados exitosamente!');
            }
        } else {
            setMensaje('Registro fallido. Intenta de nuevo.');
        }
    }

    return (
        <FormControl>
            <RadioForm label="1. ¿El embarazo fue planeado?" name="planeacion" value={planeacion} setValue={setPlaneacion} />
            <RadioForm label="2. ¿Tiene alguna enfermedad degenerativa?" name="enfermedades_degenerativas" value={enfermedades_degenerativas} setValue={setEnfermedadesDegenerativas} />
            <RadioForm label="3. ¿Ha abortado alguna vez?" name="abortos" value={abortos} setValue={setAbortos} />
            <RadioForm label="4. ¿Consumió alcohol durante el embarazo?" name="alcohol" value={alcohol} setValue={setAlcohol} />
            <RadioForm label="5. ¿Tuvo depresión o ansiedad durante el embarazo?" name="depresion_ansiedad" value={depresion_ansiedad} setValue={setDepresionAnsiedad} />
            <RadioForm label="6. ¿Consumió drogas durante el embarazo?" name="drogas" value={drogas} setValue={setDrogas} />
            <RadioForm label="7. ¿Tuvo desnutrición durante el embarazo?" name="desnutricion" value={desnutricion} setValue={setDesnutricion} />
            <RadioForm label="8. ¿Sufrió caídas durante el embarazo?" name="caidas" value={caidas} setValue={setCaidas} />
            <RadioForm label="9. ¿Sufrió maltrato físico durante el embarazo?" name="maltrato_fisico" value={maltrato_fisico} setValue={setMaltratoFisico} />
            <RadioForm label="10. ¿Tiene antecedentes de problemas genéticos?" name="problema_genetico" value={problema_genetico} setValue={setProblemaGenetico} />
            <RadioForm label="11. ¿Tuvo diabetes gestacional?" name="diabetes_gestacional" value={diabetes_gestacional} setValue={setDiabetesGestacional} />
            <RadioForm label="12. ¿Tuvo preeclampsia?" name="preclamsia" value={preclamsia} setValue={setPreclamsia} />
            <RadioForm label="13. ¿Tuvo eclampsia?" name="eclampsia" value={eclampsia} setValue={setEclampsia} />
            <RadioForm label="14. ¿Tuvo enfermedades de transmisión sexual?" name="ets" value={ets} setValue={setEts} />
            <RadioForm label="15. ¿Tuvo desprendimiento de placenta?" name="desprendimiento" value={desprendimiento} setValue={setDesprendimiento} />
            <RadioForm label="16. ¿Tuvo abrupto de placenta?" name="abrupto_placenta" value={abrupto_placenta} setValue={setAbruptoPlacenta} />

            {isData === false ? (
              <button className={styles.saveButton} type="button" onClick={saveChanges}>
                  Guardar cambios
              </button>
            ) : (
                
                <button className={styles.saveButton} type="button" onClick={updateChanges}>
                  Guardar cambios
              </button>
            )}
            <p>{mensaje}</p>
        </FormControl>
    );
}

export default PrenatalesForm;