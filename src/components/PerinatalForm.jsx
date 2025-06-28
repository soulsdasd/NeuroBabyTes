import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FormControl } from '@mui/material';
import RadioForm from '../components/RadioForm';

import Styles from '../pages/SignUpPage/SignUp.module.css';

function PerinatalesForm({ id_bebe }) {
  const [mensaje, setMensaje] = useState('');
  const [prematuro, setPrematuro] = useState('');
  const [varicela, setVaricela] = useState('');
  const [negligencia, setNegligencia] = useState('');
  const [anestesia, setAnestesia] = useState('');
  const [hepatitis, setHepatitis] = useState('');
  const [cordon_enredado, setCordonEnredado] = useState('');
  const [estres_maternal, setEstresMaternal] = useState('');
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    async function fetchDatos() {
      const { data, error } = await supabase
        .from('perinatal')
        .select('*')
        .eq('id_bebe', id_bebe)
        .single();

      if (error) {
        console.log('Error al cargar datos perinatales:', error.message);
      } else if (data) {
        setPrematuro(String(data.prematuro));
        setVaricela(String(data.varicela));
        setNegligencia(String(data.negligencia));
        setAnestesia(String(data.anestesia));
        setHepatitis(String(data.hepatitis));
        setCordonEnredado(String(data.cordon_enredado));
        setEstresMaternal(String(data.estres_maternal));
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

    if (data && data.user) {
      const { error: insertError } = await supabase
        .from('perinatal')
        .insert([{
          id_bebe,
          prematuro,
          varicela,
          negligencia,
          anestesia,
          hepatitis,
          cordon_enredado,
          estres_maternal
        }]);

      if (insertError) {
        setMensaje(`Error al insertar en la tabla: ${insertError.message}`);
      } else {
        setMensaje('¡Datos ingresados exitosamente!.');
      }
    } else {
      setMensaje('Registro fallido. Intenta de nuevo.');
    }
  };

  const updateChanges = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setMensaje('Error al obtener el usuario: ' + error.message);
      return;
    }

    if (data && data.user) {
      const { error: updateError } = await supabase
        .from('perinatal')
        .update({
          prematuro,
          varicela,
          negligencia,
          anestesia,
          hepatitis,
          cordon_enredado,
          estres_maternal
        })
        .eq('id_bebe', id_bebe);

      if (updateError) {
        setMensaje(`Error al actualizar los datos: ${updateError.message}`);
      } else {
        setMensaje('¡Datos actualizados exitosamente!');
      }
    } else {
      setMensaje('Registro fallido. Intenta de nuevo.');
    }
  };

  return (
    <FormControl>
      <RadioForm label="1. ¿Fue prematuro?" name="prematuro" value={prematuro} setValue={setPrematuro} />
      <RadioForm label="2. ¿La madre tuvo varicela?" name="varicela" value={varicela} setValue={setVaricela} />
      <RadioForm label="3. ¿Hubo negligencia médica?" name="negligencia" value={negligencia} setValue={setNegligencia} />
      <RadioForm label="4. ¿Se usó anestesia?" name="anestesia" value={anestesia} setValue={setAnestesia} />
      <RadioForm label="5. ¿La madre tuvo hepatitis?" name="hepatitis" value={hepatitis} setValue={setHepatitis} />
      <RadioForm label="6. ¿Hubo cordón umbilical enredado?" name="cordon_enredado" value={cordon_enredado} setValue={setCordonEnredado} />
      <RadioForm label="7. ¿Hubo estrés maternal?" name="estres_maternal" value={estres_maternal} setValue={setEstresMaternal} />

      <button className={Styles.saveButton} type="button" onClick={isData ? updateChanges : saveChanges}>
        Guardar cambios
      </button>
      <p>{mensaje}</p>
    </FormControl>
  );
}

export default PerinatalesForm;
