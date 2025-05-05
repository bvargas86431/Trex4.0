import React, { useState } from "react";
import styles from "../styles/Cart.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCart } from "../context/CartContext"; 

// Create the SweetAlert instance with React Content support
const MySwal = withReactContent(Swal);

export default function Cart() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const handleCheckout = () => {
    MySwal.fire({
      title: "¡Compra exitosa!",
      text: "Gracias por tu compra. ¡Nos vemos pronto!",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        container: "my-swal-container",
        title: "my-swal-title",
        confirmButton: "my-swal-button",
      },
      background: "#222",
      color: "#fff",
      confirmButtonColor: "#FFB300",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModal(true);
      }
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price_cop * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.miCarritoContainer}>
        <h2>Mi carrito</h2>
        <hr />
        {cartItems.length === 0 ? (
          <p className={styles.emptyCart}>Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.main_picture_url}
                alt={item.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productPrice}>
                  ${item.price_cop.toLocaleString("es-CO")}
                </p>
              </div>
              <div className={styles.quantitySelector}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <p className={styles.itemTotal}>
                ${(item.price_cop * item.quantity).toLocaleString("es-CO")}
              </p>
              <button
                className={styles.removeItem}
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
        <hr />
      </div>

      <div className={styles.orderSummaryContainer}>
        <h2>Resumen del pedido</h2>
        <hr />
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString("es-CO")}</span>
        </div>
        <a href="#" className={styles.shippingCalc}>
          Precio envío
        </a>
        <hr />
        <div className={styles.summaryRow}>
          <strong>Total</strong>
          <strong>${subtotal.toLocaleString("es-CO")}</strong>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Finalizar compra
        </button>
        <p className={styles.securePayment}>🔒 Pago seguro</p>
      </div>
    </div>
  );
}
