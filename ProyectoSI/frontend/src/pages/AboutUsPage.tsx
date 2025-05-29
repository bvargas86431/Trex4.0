import React from "react";
import styles from "../styles/AboutUsPage.module.css";

const AboutUsPage = () => {
  return (
    <main className={styles.aboutContainer}>
      <section className={styles.aboutContent}>
        <header>
          <h1 className={styles.title}>Sobre Nosotros</h1>
        </header>

        <p className={styles.paragraph}>
          En <strong>TreX</strong> somos apasionados por ofrecer productos de alta calidad que combinan estilo, comodidad y durabilidad. Nuestra misión es brindar una experiencia de compra única, poniendo siempre al cliente en el centro de todo lo que hacemos.
        </p>

        <p className={styles.paragraph}>
          Contamos con un equipo dedicado que trabaja constantemente para seleccionar las mejores colecciones y garantizar un servicio impecable. Valoramos la innovación, la transparencia y la sostenibilidad en cada paso que damos.
        </p>

        <p className={styles.paragraph}>
          Gracias por confiar en nosotros. Estamos aquí para acompañarte en cada paso de tu estilo de vida.
        </p>
      </section>
    </main>
  );
};

export default AboutUsPage;
