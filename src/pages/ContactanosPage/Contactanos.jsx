import styles from "./Contactanos.module.css";

import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer";

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

export default function Contactanos() {
  return (
    <>
      <Header />

      <div className={styles.contactanoscontainer}>
        <h2>Contáctanos</h2>
        <p>¿Tienes dudas, sugerencias o necesitas ayuda con el sistema? Estamos para apoyarte.</p>

        <div className={styles.contactinfo}>
          <p><strong>📧 Correo:</strong> soporte@neurobaby.mx</p>
          <p><strong>📞 Teléfono:</strong> +52 667 123 4567</p>
          <p><strong>📍 Dirección:</strong> Mazatlán, Sinaloa, México</p>
          <p><strong>🕑 Horario de atención:</strong> Lunes a Viernes, 9:00 a.m. - 5:00 p.m.</p>
        </div>

        <div className={styles.socialmedia}>
          <p><strong>Síguenos en nuestras redes sociales:</strong></p>
          <div className={styles.socialLinksContainer}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} color="#3b5998" />Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} color="#E4405F" />Instagram</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter size={24} color="#000" />X</a>
          </div>
        </div>

        <form className={styles.formulario} onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado correctamente."); }}>
          <input type="text" placeholder="Tu nombre completo" required />
          <input type="email" placeholder="Tu correo electrónico" required />
          <textarea placeholder="Escribe tu mensaje aquí..." required></textarea>
          <button type="submit">Enviar mensaje</button>
        </form>
      </div>

      <Footer />
    </>
  );
}
