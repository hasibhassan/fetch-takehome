# Fetch Backend Take-home

### Available Scripts

To run locally without Docker:
```sh
npm install
npx ts-node src/server.ts
```

To run in Docker:
```sh
docker build -t receipt-service .
docker run -p 3000:3000 receipt-service
```

To run using docker-compose:
```sh
docker-compose up --build
```