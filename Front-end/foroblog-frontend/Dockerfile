# Usar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Establecer la variable de entorno para el puerto
ENV PORT 3001

# Exponer el puerto que utilizará la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]