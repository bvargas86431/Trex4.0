import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>TreX</h2>
          <p className={styles.slogan}>ZAPATOS DE CALIDAD PARA GENTE DE CALIDAD</p>
        </div>

      </div>

      <div className={styles.divider}></div>

      <div className={styles.bottomSection}>
        <div className={styles.socialIcons}>
          <FaInstagram />
          <FaTwitter />
          <FaGithub />
        </div>
        <p className={styles.copyright}>© Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
