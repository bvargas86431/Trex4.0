import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SneakerModal from '../components/SneakerModal'; // Assuming you have the SneakerModal component
import styles from '../styles/SneakersPage.module.css';

interface Producto {
  id: number;
  main_picture_url: string;
  brand_name: string;
  name: string;
  price_cop: number;
  gender: string[];
  details: string;
  quantity: number;

}

const SneakersPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const location = useLocation();
  const { addToCart } = useCart();

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

  const openModal = (product: Producto) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>
        {location.pathname === "/hombre"
          ? "Sneakers para Hombre"
          : location.pathname === "/mujer"
          ? "Sneakers para Mujer"
          : "Todos nuestros Sneakers"}
      </h1>

      <div className={styles.grid}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.card}>
            <input
              type="checkbox"
              className={styles.cardCheckbox}
              onChange={(e) => {
                if (e.target.checked) {
                  addToCart(producto); // Adds the selected product to the cart
                }
              }}
            />
            <img
              src={producto.main_picture_url}
              alt={producto.name}
              className={styles.image}
              onClick={() => openModal(producto)} // Open the modal when clicking on the image
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{producto.brand_name}</h2>
              <h3 className={styles.cardName}>{producto.name}</h3>
              <p className={styles.cardPrice}>${formatPrice(producto.price_cop)}</p>
              <p className={styles.cardGender}>{producto.gender.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      {/* SneakerModal for viewing the product details */}
      {selectedProduct && (
        <SneakerModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          addToCart={addToCart} // Pass the 'addToCart' function here
        />
      )}
    </div>
  );
};

export default SneakersPage;
