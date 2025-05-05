import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/SneakersPage.module.css';

interface Producto {
  id: number;
  main_picture_url: string;
  brand_name: string;
  name: string;
  price_cop: number;
  gender: string[];
  details: string;
}

const SneakersPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8000/productos")
      .then(response => response.json())
      .then(data => {
        let filteredProducts = data.productos;

        if (location.pathname === "/hombre") {
          filteredProducts = filteredProducts.filter((p: Producto) =>
            p.gender.includes("Hombre")
          );
        } else if (location.pathname === "/mujer") {
          filteredProducts = filteredProducts.filter((p: Producto) =>
            p.gender.includes("Mujer")
          );
        }

        setProductos(filteredProducts);
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
      });
  }, [location.pathname]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>
        {location.pathname === "/hombre"
          ? "Sneakers para Hombre"
          : location.pathname === "/mujer"
          ? "Sneakers para Mujer"
          : "Todos los Sneakers"}
      </h1>

      <div className={styles.grid}>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className={styles.card}>
              <img
                src={producto.main_picture_url}
                alt={producto.name}
                className={styles.image}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{producto.brand_name}</h2>
                <h3 className={styles.cardName}>{producto.name}</h3>
                <p className={styles.cardPrice}>${formatPrice(producto.price_cop)}</p>
                <p className={styles.cardGender}>{producto.gender.join(', ')}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron productos para este género.</p>
        )}
      </div>
    </div>
  );
};

export default SneakersPage;
