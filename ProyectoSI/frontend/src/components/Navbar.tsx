import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styles from "../styles/navbar.module.css";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLLIElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollLink = (to: string, label: string) =>
    location.pathname === "/" ? (
      <ScrollLink to={to} smooth={true} duration={500} onClick={() => setIsOpen(false)}>
        {label}
      </ScrollLink>
    ) : (
      <Link to={`/?scrollTo=${to}`} onClick={() => setIsOpen(false)}>
        {label}
      </Link>
    );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.visible : styles.hidden}`}>
      <Link to="/" className={styles.logo}>TreX</Link>

      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <li>{scrollLink("hero", "Inicio")}</li>
        <li>{scrollLink("men", "Hombres")}</li>
        <li>{scrollLink("women", "Mujeres")}</li>
        <li>{scrollLink("offers", "Ofertas")}</li>
        <li>{scrollLink("new-collection", "Nuevas Colecciones")}</li>
        <li>{scrollLink("accessories", "Accesorios")}</li>
        <li>
          <Link to="/contactanos" onClick={() => setIsOpen(false)}>Contáctanos</Link>
        </li>
        <li>
          <Link to="/about-us" onClick={() => setIsOpen(false)}>Sobre Nosotros</Link>
        </li>

        {!isLoggedIn ? (
          <li className={styles.userMenu} ref={userMenuRef}>
            <div className={styles.userIconWrapper} onClick={() => setIsUserMenuOpen((prev) => !prev)}>
              <FaUserCircle className={styles.userIcon} />
            </div>
            {isUserMenuOpen && (
              <ul className={styles.userDropdown}>
                <li><Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link></li>
                <li><Link to="/register" onClick={() => setIsOpen(false)}>Registrarse</Link></li>
              </ul>
            )}
          </li>
        ) : (
          <li className={styles.userMenu} ref={userMenuRef}>
            <div className={styles.userIconWrapper} onClick={handleLogout}>
              <FaUserCircle className={styles.userIcon} />
              <span>Cerrar sesión</span>
            </div>
          </li>
        )}
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
