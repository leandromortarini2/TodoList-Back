import express from "express";
import router from "./routes/routes";
import cors from "cors";
import morgan from "morgan";

const server = express();

// Middleware para habilitar CORS
server.use(cors());

// Middleware para registrar las solicitudes HTTP
server.use(morgan("dev"));

// Middleware para parsear el cuerpo de la solicitud como JSON
server.use(express.json());

// Montar las rutas
server.use(router);

export default server;
