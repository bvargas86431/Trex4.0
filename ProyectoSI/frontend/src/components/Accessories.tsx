import styles from "../styles/Accessories.module.css";

const Accessories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>ACCESORIOS</h1>

        <div className={styles.imagesContainer}>
          <div className={styles.imageBox}>
            <img
              src="https://www.galax.co/cdn/shop/files/yeda-negro-rayas-40269-727277_040269-4_9c5e9d28-0234-4ede-8edb-00faf81dec1f.jpg?v=1733845171&width=600"
              alt="Medias"
              className={styles.image}
            />
            <button className={styles.button}>Ver más</button>
          </div>
          <div className={styles.imageBox}>
            <img
              src="https://images.pexels.com/photos/8437315/pexels-photo-8437315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Otros"
              className={styles.image}
            />
            <button className={styles.button}>Ver más</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;

