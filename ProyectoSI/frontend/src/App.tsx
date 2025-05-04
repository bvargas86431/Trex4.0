import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import BackgroundVideo from "./components/BackgroundVideo";
import shoesVideo from "../src/assets/video/shoes_video.mp4";
import Collection from "./components/Collection";
import ParallaxSection from "./components/ParallaxSection";
import ShoesSection from "./components/ShoesSection";
import Footer from "./components/Footer";
import Accessories from "./components/Accessories";
import SneakersPage from "./pages/SneakersPage";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import SneakersHombrePage from "./pages/SneakersHombrePage";
import SneakersMujerPage from "./pages/SneakersMujerPage";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Navbar /> {/* El Navbar siempre se mantiene visible */}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <motion.section
                id="hero"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <BackgroundVideo videoSrc={shoesVideo}>
                  <h1 className="title">
                    <span>TreX:</span> Estilo en cada paso
                  </h1>
                  <p className="subtitle">Zapatos de calidad para gente de calidad.</p>
  
                  <Link to="/sneakers">
                    <button className="button">Ver Más</button>
                  </Link>
                </BackgroundVideo>
              </motion.section>

              <motion.section
                id="new-collection"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h1 className="tittleCollection">NUEVA COLECCIÓN TreX</h1>
                <div className="collectionContainer">
                  <Collection
                    imgCollection="https://us.123rf.com/450wm/bondvit/bondvit1611/bondvit161100014/65789979-hombre-de-negocios-de-ropa-zapatos-pol%C3%ADtico-el-estilo-del-hombre-de-negocios-abroch%C3%A1ndose-la.jpg"
                    title="Hombre"
                    text="Comodidad y estilo para cualquier ocasión. Descubre la nueva colección."
                  />
                  <Collection
                    imgCollection="https://cdn.thewirecutter.com/wp-content/media/2024/05/white-sneaker-2048px-9338.jpg?auto=webp&quality=75&width=1024"
                    title="Sneakers"
                    text="Comodidad y estilo para cualquier ocasión. Descubre la nueva colección."
                  />
                  <Collection
                    imgCollection="https://efesalud.com/wp-content/uploads/2021/10/3835469-e1483536504194.jpg"
                    title="Mujer"
                    text="Comodidad y estilo para cualquier ocasión. Descubre la nueva colección."
                  />
                </div>
              </motion.section>

              <motion.section
                id="men"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="menShoesContainer">
                  <ShoesSection
                    title="Colección Hombre"
                    description="Explora nuestra selección de zapatos para hombre, con comodidad y estilo en cada paso."
                    imageUrl="https://www.bxxyshoe.in/cdn/shop/files/MG_9106copy_a0e09d91-8c8c-4a54-afa1-ed954b399ee5.jpg?v=1710396911&width=1445"
                  />
                </div>
              </motion.section>

              <motion.section
                id="women"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="womenShoesContainer">
                  <ShoesSection
                    title="Colección Mujer"
                    description="Descubre nuestra colección de zapatos para mujer, diseñados para cada ocasión."
                    imageUrl="https://images.pexels.com/photos/27100515/pexels-photo-27100515/free-photo-of-a-woman-wearing-high-heels.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    reverse={true}
                  />
                </div>
              </motion.section>

              <motion.section
                id="offers"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="parallaxContainer">
                  <ParallaxSection />
                </div>
              </motion.section>

              <motion.section
                id="accessories"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Accessories />
              </motion.section>

              <motion.section
                id="contact"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Footer />
              </motion.section>
            </div>
          }
        />
        
        {/* Nueva ruta para sneakers */}
        <Route path="/sneakers" element={<SneakersPage />} />
        <Route path="/hombre" element={<SneakersHombrePage />} />
        <Route path="/mujer" element={<SneakersMujerPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
