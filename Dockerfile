FROM node:20-alpine

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application uniquement pour la production
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 4000

# Commande par défaut : start en prod, dev en local
CMD ["npm", "start"]
