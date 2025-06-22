import styles from "../SignUpPage/SignUp.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../supabaseClient";

function Login() {
  const navigate = useNavigate();

  const goRegister = () => {
    navigate("/sign-up");
  };

  // send user to home page after sign up/login
  const goHome = () => {
    navigate("/Home");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      console.log("Usuario:", data.user);
    }

    goHome();
  };

  return (
    <>
      <div className={styles.flexContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.formContainer}>
              <h1>NeurobabyTest</h1>
              <h2 className={styles.textForm}>Inicio de sesión</h2>
              <div className={styles.inputContainer}>
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
                Iniciar sesión
              </button>
              <div className="errorContainer">
                {mensaje && <p>{mensaje}</p>}
              </div>
              <p>
                Aun no tienes cuenta?{" "}
                <span onClick={goRegister} className={styles.textLink}>
                  ¡Registrate aqui!
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="/src/assets/login.jpeg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Login;
