import React, { useState } from "react";
import styles from "../styles/Cart.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Create the SweetAlert instance with React Content support
const MySwal = withReactContent(Swal);

export default function Cart() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCheckout = () => {
    // Trigger the SweetAlert2 popup on checkout with custom styles
    MySwal.fire({
      title: "¡Compra exitosa!",
      text: "Gracias por tu compra. ¡Nos vemos pronto!",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        container: "my-swal-container", // Custom class for the container
        title: "my-swal-title",          // Custom class for the title
        confirmButton: "my-swal-button", // Custom class for the button
      },
      // Make the background darker
      background: "#222", // Darker background color
      color: "#fff",      // Set the text color
      confirmButtonColor: "#FFB300", // Button color
    }).then((result) => {
      if (result.isConfirmed) {
        // Optionally close the modal or handle other actions
        setShowModal(true);
      }
    });
  };
  

  return (
    <div className={styles.cartContainer}>
      <div className={styles.miCarritoContainer}>
        <h2>Mi carrito</h2>
        <hr />
        <div className={styles.cartItem}>
          <img
            src="https://media.falabella.com/falabellaCO/73017607_1/w=800,h=800,fit=pad"
            alt="Paquete del mes"
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <p className={styles.productName}>Paquete del mes</p>
            <p className={styles.productPrice}>$1,000.00</p>
          </div>
          <div className={styles.quantitySelector}>
            <button>-</button>
            <input type="text" value="1" readOnly />
            <button>+</button>
          </div>
          <p className={styles.itemTotal}>$1,000.00</p>
          <button className={styles.removeItem}>×</button>
        </div>
        <hr />
      </div>

      {/* Order Summary Section */}
      <div className={styles.orderSummaryContainer}>
        <h2>Resumen del pedido</h2>
        <hr />
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>$1,000.00</span>
        </div>
        <a href="#" className={styles.shippingCalc}>
          Precio envío
        </a>
        <hr />
        <div className={styles.summaryRow}>
          <strong>Total</strong>
          <strong>$1,000.00</strong>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Finalizar compra
        </button>
        <p className={styles.securePayment}>🔒 Pago seguro</p>
      </div>
    </div>
  );
}
