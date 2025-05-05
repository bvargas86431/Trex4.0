import styles from "../styles/Collection.module.css";
import { Link } from "react-router-dom";

interface CollectionProps {
  imgCollection: string;
  title: string;
  text: string;
}

export default function Collection({ imgCollection, title, text }: CollectionProps) {
  // Define la ruta explícita para las colecciones
  let route = "";

  if (title === "Hombre") {
    route = "/hombre";
  } else if (title === "Mujer") {
    route = "/mujer";
  } else if (title === "Sneakers") {
    route = "/sneakers";
  }

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.imgContainer}>
        <img src={imgCollection} alt="Collection Image" />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>

        <Link to={route}>
          <button className={styles.loadMoreBtn}>VER MÁS</button>
        </Link>
      </div>
    </div>
  );
}
