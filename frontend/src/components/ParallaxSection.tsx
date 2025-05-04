import styles from "../styles/ParallaxSection.module.css";

const ParallaxSection = () => {
  return (
    <div
      className={styles.parallaxContainer}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1533867617858-e7b97e060509?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fMnx8emFwYXRvcyUyMGRlJTIwaG9tYnJlfGVufDB8fDB8fHww")`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.overlay}>
        <h2 className={styles.title}>Ofertas Exclusivas</h2>
        <button className={styles.button}>Descubrir</button>
      </div>
    </div>
  );
};

export default ParallaxSection;
