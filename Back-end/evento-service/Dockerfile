# Usa una imagen base adecuada para tu proyecto (por ejemplo, Node.js)
FROM node:16-alpine

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación escucha
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
