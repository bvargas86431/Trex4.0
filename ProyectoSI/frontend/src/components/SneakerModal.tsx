// src/components/SneakerModal.tsx

import React, { useState } from 'react';
import styles from '../styles/SneakerModal.module.css';

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

interface SneakerModalProps {
  product: Producto | null;
  isOpen: boolean;
  onClose: () => void;
  addToCart: (product: Producto) => void;
}

const americanSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

const SneakerModal: React.FC<SneakerModalProps> = ({ product, isOpen, onClose, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null); // State for selected size

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size); // Set the selected size
  };

  if (!isOpen || !product) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.imageContainer}>
          <img src={product.main_picture_url} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.productInfo}>
          <h2>{product.brand_name}</h2>
          <h3>{product.name}</h3>
          <p className={styles.price}>${new Intl.NumberFormat('es-CO').format(product.price_cop)}</p>

          <div className={styles.sizes}>
            <p>Selecciona tu talla (US):</p>
            <div className={styles.sizeList}>
              {americanSizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`} // Add a class if selected
                  onClick={() => handleSizeSelect(size)} // Handle size selection
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(product)} className={styles.addToCartButton}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SneakerModal;
