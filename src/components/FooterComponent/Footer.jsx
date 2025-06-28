import { useState } from 'react';
import Styles from './Footer.module.css';

export default function Footer() {
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = (type) => {
    let content = '';
    if (type === 'privacidad') {
      content = `
        En NeuroBaby, respetamos la privacidad de nuestros usuarios. Toda la información proporcionada es confidencial y se usa solo para seguimiento del desarrollo infantil. No compartimos datos con terceros sin consentimiento. Puedes solicitar la eliminación de tu información en cualquier momento.
      `;
    } else if (type === 'servicio') {
      content = `
        El uso de NeuroBabyTest implica aceptar que esta plataforma no sustituye una consulta médica profesional. Es una herramienta informativa. El usuario se compromete a usarla con responsabilidad. NeuroBaby puede modificar funciones o contenido sin previo aviso.
      `;
    } else if (type === 'soporte') {
      content = `
        ¿Tienes dudas o necesitas ayuda? Escríbenos a soporte@neurobaby.mx. Nuestro horario de atención es de lunes a viernes de 9 a.m. a 5 p.m. Estamos para ayudarte con accesos, uso del sistema o gestión de datos.
      `;
    }
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={Styles.containerEnd}>
        <p>
          <b>NeuroBabyTest <br /></b>
          Empoderar a los padres con conocimiento
        </p>
        <div className={Styles.navLinks}>
          <a className={Styles.aa} onClick={() => openModal('privacidad')}>Políticas de Privacidad</a>
          <a className={Styles.aa} onClick={() => openModal('servicio')}>Políticas de Servicio</a>
          <a className={Styles.aa} onClick={() => openModal('soporte')}>Soporte</a>
        </div>
      </div>

      {showModal && (
        <div className={Styles.modalOverlay} onClick={closeModal}>
          <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={Styles.closeButton} onClick={closeModal}></button>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </>
  );
}
