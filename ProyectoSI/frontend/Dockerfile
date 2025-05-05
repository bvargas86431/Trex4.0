# Usar una imagen oficial de Node.js (elige la versión que prefieras)
FROM node:16-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm/yarn
COPY package.json package-lock.json /app/

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el resto del código fuente del frontend
COPY . /app

# Compilar el proyecto para producción (si estás utilizando Vite)
RUN npm run build

# Exponer el puerto en el que el frontend será accesible (usualmente 3000 para proyectos Vite)
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo o producción (ajustar según tu configuración)
CMD ["npm", "run", "dev"]
