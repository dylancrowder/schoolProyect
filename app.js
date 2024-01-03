import express from "express";
import session from "express-session";
import http from "http";
import { initMongo } from "./mongo/mongodb.js";
import passport from "passport";
import cors from "cors";
import { initPass } from "./auth/config.js";
import { URI } from "./mongo/mongodb.js";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import students from "./router/students.router.js";
import userAuth from "./router/userAuth.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para analizar solicitudes con cuerpo en formato JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);


const SESSION_SECRET = "|7@3BBY5jH:@zFQIg_v47HkKP5S#p&Uc";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 600
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

initPass();
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", userAuth);
app.use("/", students);

const server = http.createServer(app);

initMongo(server);

server.listen(PORT, () => {
  console.log("El servidor funciona correctamente");
});
