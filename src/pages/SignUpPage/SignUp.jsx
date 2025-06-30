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

  const [tipomensaje, setTipomensaje] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [rol, setRol] = useState("tutor");
  const [notificacion, setNotificacion] = useState(null);

const handleSignUp = async (e) => {
  e.preventDefault();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: "temporal",
  });

if (signInError?.message === "Invalid login credentials") {
  setNotificacion({
    type: "error",
    message: "Este correo ya está registrado.",
  });
  return;
}

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setMensaje(`Error: ${error.message}`);
    setTipomensaje("Error");
    return;
  }

  if (data && data.user) {
    const userId = data.user.id;

    // Primero verificamos si ya hay perfil con este id_perfil
    const { data: existingProfile, error: selectError } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id_perfil", userId)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // Error inesperado al consultar el perfil
      setNotificacion({
        type: 'error',
        message: `Error al consultar perfil: ${selectError.message}`
      });
      return;
    }

    if (existingProfile) {
      // Ya existe perfil
      setNotificacion({
        type: 'error',
        message: 'Usuario ya existente'
      });
    } else {
      // No existe perfil, insertamos
      const { error: insertError } = await supabase
        .from("perfiles")
        .insert([{ id_perfil: userId, nombre_perfil: name, rol_perfil: rol }]);

      if (insertError) {
        setMensaje(`Usuario registrado, pero no se pudo guardar perfil`);
        setTipomensaje("Error");
      } else {
        setNotificacion({
          type: 'success',
          message: '¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.'
        });
        setMensaje("Registro exitoso. Revisa tu correo para confirmar.");
        setTipomensaje("Exito");
      }
    }
  } else {
    setNotificacion({
      type: 'error',
      message: 'Registro fallido. Intenta de nuevo.'
    });
    setMensaje(""); // limpieza
    setTimeout(() => {
      setMensaje("Registro fallido. Intenta de nuevo.");
    }, 0);
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

              <div className={styles.mensajeContainer}>
                {mensaje && (
                  <p
                    className={
                      tipomensaje === "Exito"
                        ? styles.mensajeExito
                        : styles.mensajeError
                    }>
                    {mensaje}
                  </p>
                )}
              </div>

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
