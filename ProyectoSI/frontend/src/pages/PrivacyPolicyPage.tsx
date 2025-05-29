import React from "react";
import styles from "../styles/PrivacyPolicyPage.module.css";

const PrivacyPolicyPage = () => {
  return (
    <main className={styles.privacyContainer}>
      <section className={styles.privacyContent}>
        <header>
          <h1 className={styles.title}>Política de Privacidad</h1>
        </header>

        <p className={styles.paragraph}>
          En <strong>TreX</strong>, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tu información personal.
        </p>

        <h2 className={styles.subtitle}>Información que recopilamos</h2>
        <p className={styles.paragraph}>
          Recopilamos información que nos proporcionas directamente, como nombre, correo electrónico y detalles de pago cuando realizas una compra o creas una cuenta.
        </p>

        <h2 className={styles.subtitle}>Uso de la información</h2>
        <p className={styles.paragraph}>
          Utilizamos tu información para procesar pedidos, ofrecer soporte al cliente, enviar actualizaciones y mejorar nuestros servicios.
        </p>

        <h2 className={styles.subtitle}>Compartir información</h2>
        <p className={styles.paragraph}>
          No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley o procesar pagos seguros.
        </p>

        <h2 className={styles.subtitle}>Tus derechos</h2>
        <p className={styles.paragraph}>
          Puedes acceder, modificar o eliminar tu información personal en cualquier momento contactándonos a <a href="mailto:privacidad@trex.com" className={styles.link}>privacidad@trex.com</a>.
        </p>

        <p className={styles.paragraph}>
          Esta política puede actualizarse ocasionalmente. Te recomendamos revisarla periódicamente.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
