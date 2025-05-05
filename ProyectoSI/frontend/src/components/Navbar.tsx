import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // React Router for navigation
import { Link as ScrollLink } from "react-scroll"; // React Scroll for smooth scrolling
import styles from "../styles/navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.visible : styles.hidden}`}>
      <Link to="/" className={styles.logo}>TreX</Link>


      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <li>
          <ScrollLink to="hero" smooth={true} duration={500}>Inicio</ScrollLink>
        </li>
        <li>
          <ScrollLink to="men" smooth={true} duration={500}>Hombres</ScrollLink>
        </li>
        <li>
          <ScrollLink to="women" smooth={true} duration={500}>Mujeres</ScrollLink>
        </li>
        <li>
          <ScrollLink to="offers" smooth={true} duration={500}>Ofertas</ScrollLink>
        </li>
        <li>
          <ScrollLink to="new-collection" smooth={true} duration={500}>Nuevas Colecciones</ScrollLink>
        </li>
        <li>
          <ScrollLink to="accessories" smooth={true} duration={500}>Accesorios</ScrollLink>
        </li>
        <li>
          <ScrollLink to="contact" smooth={true} duration={500}>Contacto</ScrollLink>
        </li>
      </ul>

      <div className={styles.buyingContainer}>
        <Link to="/cart" className={styles.carContainer}>
          <IoCartSharp className={styles.carIcon} />
        </Link>
        <a href="#" className={styles.contactButton}>Comprar ahora</a>
      </div>

      <button className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
