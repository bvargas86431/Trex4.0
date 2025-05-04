import styles from "../styles/ShoesSection.module.css";

interface ShoesSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean; 
}

const ShoesSection: React.FC<ShoesSectionProps> = ({ title, description, imageUrl, reverse }) => {
  return (
    <section className={`${styles.container} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <button className={styles.button}>Ver más</button> 
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </div>
    </section>
  );
};

export default ShoesSection;

