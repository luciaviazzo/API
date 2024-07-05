// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import paintingRouter from "./routes/paintingRouter.js";
import userRouter from "./routes/userRouter.js"; // Importa como predeterminado
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3003;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/paintings', paintingRouter);
app.use('/users', userRouter); // Usa el router importado directamente

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
