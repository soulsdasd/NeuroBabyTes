import styles from './SignUp.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../supabaseClient';


function Registro() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/login');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSignUp = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setMensaje(`Error: ${error.message}`);
    return;
  }

  // Verificamos que data y user existan
  if (data && data.user) {
    const userId = data.user.id;

    const { error: insertError } = await supabase
      .from('mama')
      .insert([{ id_mama: userId, nombre_mama: name}]);

    if (insertError) {
      setMensaje(`Usuario registrado, pero no se pudo guardar perfil: ${insertError.message}`);
    } else {
      setMensaje('Registro exitoso. Revisa tu correo para confirmar.');
    }
  } else {
    setMensaje('Registro fallido. Intenta de nuevo.');
  }
};


  return (
    <>
    <div className={styles.flexContainer}>
      <div className={styles.mainContainer}>
          <div className={styles.container}>
            <form onSubmit={handleSignUp} className={styles.formContainer}>
              <h1>NeurobabyTest</h1>
              <h2 className={styles.textForm}>Registro de usuario</h2>
              <div className={styles.inputContainer}>
                <label className={styles.labelForm} htmlFor='name'>Nombre completo</label>
                  <input
                    id='name'
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.inputForm}
                  />
                <label className={styles.labelForm} htmlFor='email'>Correo electronico</label>
                  <input
                    id='email'
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.inputForm}
                  />
                <label className={styles.labelForm} htmlFor='password'>Contraseña</label>
                <input
                  id='password'
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.inputForm}
                />
              </div>
              
              <button type="submit" className={styles.buttonForm}>Registrarse</button>
              <div className='errorContainer'>
                {mensaje && <p>{mensaje}</p>}
              </div>
              <p>¿Ya tienes una cuenta? <span onClick={goLogin} className={styles.textLink}>¡Inicia sesión aqui!</span></p>
            </form>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="/src/assets/login.jpeg" alt=""/>
        </div>
    </div>
    </>
  );
}

export default Registro;
