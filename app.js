import express from "express";
import http from "http";
import { initMongo } from "./mongo/mongodb.js";
import students from "./router/students.router.js";
import cors from "cors"
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/", students);

const server = http.createServer(app);

await initMongo(server);

server.listen(PORT, () => {
  console.log("el servidor funciona correctamente");
});
