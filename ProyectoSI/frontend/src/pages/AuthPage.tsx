import React, { useState, useEffect } from "react";
import "../styles/AuthPage.css";
import { useLocation } from "react-router-dom"; // Asegúrate de importar useLocation

const AuthPage = () => {
  const location = useLocation();
  const [formType, setFormType] = useState("login");

  // Campos compartidos
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState<string>(""); // Añadido para manejar errores

  useEffect(() => {
    if (location.pathname === "/register") {
      setFormType("register");
    } else {
      setFormType("login");
    }
  }, [location.pathname]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!nombre || !correo || !contraseña) {
      setError("Por favor completa todos los campos");
      return;
    }
  
    const res = await fetch("http://localhost:8000/auth/registro", {
      method: "POST",  // Asegúrate de que sea POST
      headers: {
        "Content-Type": "application/json", // Usamos JSON como tipo de contenido
      },
      body: JSON.stringify({
        nombre,
        correo,
        contraseña,
      }),
    });
  
    const result = await res.json();
    if (res.ok) {
      alert("Usuario registrado correctamente");
      setFormType("login");
      setError(""); // Limpiar el error si el registro fue exitoso
    } else {
      alert("Error al registrar: " + result.detail);
      setError("Error al registrar el usuario");
    }
  };
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica antes de enviar el formulario
    if (!correo || !contraseña) {
      setError("Por favor ingresa tu correo y contraseña");
      return;
    }

    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data); // Verifica la respuesta para ver si hay algún error

      // Almacenar el token en localStorage
      localStorage.setItem("authToken", data.access_token);

      alert("Inicio de sesión exitoso");

      // Redirigir a la página de inicio después de iniciar sesión correctamente
      window.location.href = "/"; // Redirige a la página principal
    } else {
      const error = await res.json();
      alert("Error al iniciar sesión: " + error.detail);
      setError("Error al iniciar sesión"); // Mostrar error en el login
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        {formType === "login" ? (
          <>
            <h2>Iniciar sesión</h2>
            {error && <p className="error-message">{error}</p>} {/* Mostrar el error si hay */}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="input-field"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <button type="submit" className="submit-button">
                Iniciar sesión
              </button>
            </form>
            <p onClick={() => setFormType("register")}>
              ¿No tienes cuenta? <a href="/register">Regístrate</a>
            </p>
          </>
        ) : (
          <>
            <h2>Registrarse</h2>
            {error && <p className="error-message">{error}</p>} {/* Mostrar el error si hay */}
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nombre"
                className="input-field"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="input-field"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <button type="submit" className="submit-button">
                Registrarse
              </button>
            </form>
            <p onClick={() => setFormType("login")}>
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
