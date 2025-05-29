import React from "react";
import styles from "../styles/TermsPage.module.css";

const TermsPage = () => {
  return (
    <main className={styles.termsContainer}>
      <section className={styles.termsContent}>
        <header>
          <h1 className={styles.title}>Términos y Condiciones</h1>
        </header>

        <p className={styles.paragraph}>
          Bienvenido a <strong>TreX</strong>. Al utilizar nuestro sitio web, aceptas estar sujeto a los siguientes términos y condiciones:
        </p>

        <ul className={styles.list}>
          <li className={styles.listItem}>Los productos ofrecidos están sujetos a disponibilidad.</li>
          <li className={styles.listItem}>El contenido del sitio está protegido por derechos de autor.</li>
          <li className={styles.listItem}>El uso indebido del sitio puede resultar en la terminación de tu cuenta.</li>
          <li className={styles.listItem}>La información personal será tratada de acuerdo con nuestra política de privacidad.</li>
          <li className={styles.listItem}>Nos reservamos el derecho de modificar estos términos en cualquier momento.</li>
        </ul>

        <p className={styles.paragraph}>
          Si tienes preguntas, contáctanos a <a href="mailto:soporte@trex.com" className={styles.link}>soporte@trex.com</a>.
        </p>
      </section>
    </main>
  );
};

export default TermsPage;
