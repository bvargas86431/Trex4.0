import React, { useState } from "react";
import styles from "../styles/ContactUsPage.module.css";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    setSubmitted(true);
  };

  return (
    <main className={styles.contactContainer}>
      <h1 className={styles.title}>Contáctanos</h1>
      <p className={styles.subtitle}>
        ¿Tienes alguna pregunta o comentario? ¡Nos encantaría saber de ti!
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className={styles.label}>Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message" className={styles.label}>Mensaje</label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitButton}>Enviar</button>
        </form>
      ) : (
        <p className={styles.thankYouMessage}>¡Gracias por contactarnos! Te responderemos pronto.</p>
      )}
    </main>
  );
};

export default ContactUsPage;
