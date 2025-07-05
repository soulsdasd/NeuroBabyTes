import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../supabaseClient";

import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import Notification from "../../components/NotificacionComponent/NotificacionComponent";

function SignUp() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rol, setRol] = useState("tutor");
  const [notificacion, setNotificacion] = useState(null);

const handleSignUp = async (e) => {
  e.preventDefault();

  // Validar campos
  if (!email || !password || !name || !rol) {
    setNotificacion({ type: 'error', message: 'Todos los campos son obligatorios' });
    return;
  }

  // Comprobar si el usuario ya existe
  const { data: existingUsers, error: queryError } = await supabase
    .from('auth.users')
    .select('id')
    .eq('email', email);

  if (queryError) {
    setNotificacion({ type: 'error', message: 'Error al verificar el correo' });
    return;
  }

  if (existingUsers.length > 0) {
    setNotificacion({
      type: 'error',
      message: 'Correo ya registrado. Ingrese otro o inicie sesión'
    });
    return;
  }

  // Registrar usuario
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    setNotificacion({
      type: 'error',
      message: 'No se pudo registrar el usuario: ' + signUpError.message
    });
    return;
  }

  const userId = data?.user?.id;
  if (!userId) {
    setNotificacion({
      type: 'error',
      message: 'Registro incompleto: no se obtuvo ID de usuario.'
    });
    return;
  }

  // Insertar perfil
  const { error: insertError } = await supabase
    .from("perfiles")
    .insert([{ id_perfil: userId, nombre_perfil: name, rol_perfil: rol }]);

  if (insertError) {
    setNotificacion({
      type: 'error',
      message: 'Usuario registrado, pero no se pudo guardar perfil'
    });
  } else {
    setNotificacion({
      type: 'success',
      message: '¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.'
    });
  }
};

  const handleChange = (e) => {
    setRol(e.target.value);
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
                <label className={styles.labelForm} htmlFor="name">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.inputForm}
                />
                <div>
                  <label className={styles.labelForm}>Selecciona tu rol</label>
                  <div className={styles.radioContainer}>
                    <label
                      className={`${styles.option} ${
                        rol === "fisioterapeuta" ? styles.selected : ""
                      }`}>
                      <input
                        type="radio"
                        name="rol"
                        value="fisioterapeuta"
                        checked={rol === "fisioterapeuta"}
                        onChange={handleChange}
                      />
                      <FaUserDoctor />
                      Fisioterapeuta
                    </label>

                    <label
                      className={`${styles.option} ${
                        rol === "tutor" ? styles.selected : ""
                      }`}>
                      <input
                        type="radio"
                        name="rol"
                        value="tutor"
                        checked={rol === "tutor"}
                        onChange={handleChange}
                      />
                      <IoPersonSharp />
                      Tutor
                    </label>
                  </div>
                </div>
                <label className={styles.labelForm} htmlFor="email">
                  Correo electronico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.inputForm}
                />
                <label className={styles.labelForm} htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.inputForm}
                />
              </div>

              <button type="submit" className={styles.buttonForm}>
                Registrarse
              </button>

              <p>
                ¿Ya tienes una cuenta?{" "}
                <span onClick={goLogin} className={styles.textLink}>
                  ¡Inicia sesión aqui!
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="/src/assets/login.jpeg" alt="" />
        </div>
        <div>
          <Notification notification={notificacion} onClose={() => setNotificacion(null)}/>
        </div>
      </div>
    </>
  );
}

export default SignUp;
