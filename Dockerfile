# Use a imagem do node como base
FROM node:latest

# Criação do diretório de trabalho da aplicação
WORKDIR /app

# Copia os arquivos necessários para a construção do container
COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

# Instalação das dependências
RUN npm install
RUN npm install @nestjs/typeorm typeorm mysql2 @nestjs/swagger

# Build da aplicação
RUN npm run build

# Exposição da porta da aplicação
EXPOSE 3000

# Set the environment variables
ENV MYSQL_HOST=localhost:3000
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=dev123
ENV MYSQL_DATABASE=parkinglotapi

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
