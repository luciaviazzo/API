//importaciones y configuraciones
import express from "express";
import dotenv from "dotenv";
import { paintingRouter } from "./routes/paintingRouter.js";
import { userRouter } from "./routes/userRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

//puerto
const SERVER_PORT = process.env.SERVER_PORT || 3003;

//configuracion de Express
const app = express();
app.use(express.json());

//rutas
app.use('/api', paintingRouter());
app.use('/api', userRouter());
app.use(errorHandler);

//iniciar el servidor
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
