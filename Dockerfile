FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run gen-types
RUN npx tsc
CMD ["node", "dist/server.js"]
EXPOSE 3000
