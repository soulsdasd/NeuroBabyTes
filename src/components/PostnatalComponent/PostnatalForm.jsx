import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FormControl } from '@mui/material';
import RadioForm from '../../components/RadioForm';

import Styles from '../../pages/SignUpPage/SignUp.module.css';

function PostnatalForm({ id_bebe }) {
  const [mensaje, setMensaje] = useState('');
  const [meconio, set_meconio] = useState('');
  const [bajo_peso, set_bajo_peso] = useState('');
  const [malformacion, set_malformacion] = useState('');
  const [falta_vacunacion, set_falta_vacunacion] = useState('');
  const [deshidratacion, set_deshidratacion] = useState('');
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    async function fetchDatos() {
      const { data, error } = await supabase
        .from('postnatal')
        .select('*')
        .eq('id_bebe', id_bebe)
        .single();

      if (error) {
        console.log('Error al cargar datos postnatales:', error.message);
      } else if (data) {
        set_meconio(String(data.meconio));
        set_bajo_peso(String(data.bajo_peso));
        set_malformacion(String(data.malformacion));
        set_falta_vacunacion(String(data.falta_vacunacion));
        set_deshidratacion(String(data.deshidratacion));
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
        .from('postnatal')
        .insert([{
          id_bebe,
          meconio: meconio,
          bajo_peso: bajo_peso,
          malformacion: malformacion,
          falta_vacunacion: falta_vacunacion,
          deshidratacion: deshidratacion,
        }]);

      if (insertError) {
        setMensaje(`Error al insertar en la tabla: ${insertError.message}`);
      } else {
        setMensaje('¡Datos ingresados exitosamente!');
        setIsData(true);
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
        .from('postnatal')
        .update({
          meconio: meconio,
          bajo_peso: bajo_peso,
          malformacion: malformacion,
          falta_vacunacion: falta_vacunacion,
          deshidratacion: deshidratacion,
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
      <RadioForm label="1. ¿Hubo meconio?" name="meconio" value={meconio} setValue={set_meconio} />
      <RadioForm label="2. ¿Bajo peso?" name="bajo_peso" value={bajo_peso} setValue={set_bajo_peso} />
      <RadioForm label="3. ¿Malformación?" name="malformacion" value={malformacion} setValue={set_malformacion} />
      <RadioForm label="4. ¿Falta de vacunación?" name="falta_vacunacion" value={falta_vacunacion} setValue={set_falta_vacunacion} />
      <RadioForm label="5. ¿Deshidratación?" name="deshidratacion" value={deshidratacion} setValue={set_deshidratacion} />

      <button className={Styles.saveButton} type="button" onClick={isData ? updateChanges : saveChanges}>
        Guardar cambios
      </button>
      <p>{mensaje}</p>
    </FormControl>
  );
}

export default PostnatalForm;
