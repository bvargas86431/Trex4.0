import React, { useState } from "react";
import styles from "../styles/PaymentModal.module.css";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    cardType: string;
  }) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    cardType: "Visa", // Tipo de tarjeta por defecto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Esto ahora coincide con el tipo actualizado de `onSubmit`
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Detalles de Pago</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Nombre del titular de la tarjeta */}
          <input
            type="text"
            name="name"
            placeholder="Nombre del titular de la tarjeta"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />

          {/* Número de tarjeta */}
          <input
            type="text"
            name="cardNumber"
            placeholder="Número de tarjeta"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            maxLength={19}
            className={styles.input}
          />

          {/* Selección de tipo de tarjeta */}
          <div className={styles.row}>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              className={styles.inputHalf}
            >
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Amex">American Express</option>
              <option value="Discover">Discover</option>
            </select>
          </div>

          {/* Fecha de expiración (Mes y Año) */}
          <div className={styles.row}>
            <select
              name="expirationMonth"
              value={formData.expirationMonth}
              onChange={handleChange}
              required
              className={styles.inputHalf}
            >
              <option value="">Mes</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, "0")}>
                  {month.toString().padStart(2, "0")}
                </option>
              ))}
            </select>

            <select
              name="expirationYear"
              value={formData.expirationYear}
              onChange={handleChange}
              required
              className={styles.inputHalf}
            >
              <option value="">Año</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* CVV */}
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
            maxLength={4}
            className={styles.input}
          />

          {/* Dirección de facturación */}
          <input
            type="text"
            name="address"
            placeholder="Dirección de facturación"
            value={formData.address}
            onChange={handleChange}
            required
            className={styles.input}
          />
          
          {/* Ciudad */}
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
            required
            className={styles.input}
          />
          
          {/* Código postal */}
          <input
            type="text"
            name="postalCode"
            placeholder="Código postal"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className={styles.input}
          />

          {/* País */}
          <input
            type="text"
            name="country"
            placeholder="País"
            value={formData.country}
            onChange={handleChange}
            required
            className={styles.input}
          />

          {/* Número de teléfono */}
          <input
            type="text"
            name="phone"
            placeholder="Número de teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />

          {/* Botones */}
          <div className={styles.buttonRow}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.payButton}
            >
              Pagar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
