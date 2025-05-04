import { useEffect, useState } from 'react';
import styles from "../styles/SneakersPage.module.css";

interface Producto {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
  imagen: string;
}

const SneakersPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error cargando los productos:', error));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Sneakers Disponibles</h1>
      <div className={styles.grid}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.card}>
            <img
              src={producto.imagen}
              alt={producto.modelo}
              className={styles.image}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{producto.marca}</h2>
              <p className={styles.cardSubtitle}>{producto.modelo}</p>
              <p className={styles.cardPrice}>${producto.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SneakersPage;
