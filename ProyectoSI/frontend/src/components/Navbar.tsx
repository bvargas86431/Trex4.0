import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importar useNavigate
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Estado para controlar el login

  let lastScrollY = 0;

  // Controlar visibilidad de navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Si hay un token, el usuario está logueado
  }, []);

  // Cerrar menú usuario al hacer clic fuera
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
      <ScrollLink to={to} smooth={true} duration={500}>
        {label}
      </ScrollLink>
    ) : (
      <Link to={`/?scrollTo=${to}`}>{label}</Link>
    );

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token al cerrar sesión
    setIsLoggedIn(false); // Actualizar el estado de login
    navigate("/"); // Redirigir a la página principal
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
        <li>{scrollLink("contact", "Contacto")}</li>

        {/* Mostrar opciones de sesión solo si el usuario no está logueado */}
        {!isLoggedIn ? (
          <li className={styles.userMenu} ref={userMenuRef}>
            <div className={styles.userIconWrapper} onClick={() => setIsUserMenuOpen((prev) => !prev)}>
              <FaUserCircle className={styles.userIcon} />
            </div>
            {isUserMenuOpen && (
              <ul className={styles.userDropdown}>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
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
