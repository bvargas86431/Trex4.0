import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import styles from "../styles/navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

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
      <div className={styles.logo}>TreX</div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <li><Link to="hero" smooth={true} duration={500}>Inicio</Link></li>
        <li><Link to="men" smooth={true} duration={500}>Hombres</Link></li>
        <li><Link to="women" smooth={true} duration={500}>Mujeres</Link></li>
        <li><Link to="offers" smooth={true} duration={500}>Ofertas</Link></li>
        <li><Link to="new-collection" smooth={true} duration={500}>Nuevas Colecciones</Link></li>
        <li><Link to="accessories" smooth={true} duration={500}>Accesorios</Link></li>
        <li><Link to="contact" smooth={true} duration={500}>Contacto</Link></li>
      </ul>

      <a href="#" className={styles.contactButton}>Comprar ahora</a>

      <button className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
