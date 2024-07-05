// userRouter.js
import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { schemaValidator } from '../middlewares/validations.js';
import { createUserSchema, loginSchema, idUserSchema } from "../schemas/userSchemas.js"; // Importa los esquemas de usuario

const userRouter = Router(); // instancia de router

const { register, login, profile, refreshToken } = userController(); // desestructura las funciones

// define las rutas y los métodos HTTP correspondientes
userRouter.post("/register", schemaValidator(createUserSchema), register); // ruta post para registrar un usuario
userRouter.post("/login", schemaValidator(loginSchema), login); // ruta post para iniciar sesión
userRouter.get("/profile/:id", schemaValidator({ params: idUserSchema }), profile); // ruta get para obtener el perfil de un usuario por ID
userRouter.post("/refresh-token", refreshToken); // ruta post para refrescar el token

export default userRouter; // Exporta el router configurado como predeterminado




/*//importaciones
import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRoutes = () => {
    const userRouter = Router(); //nueva instancia de router
    const { register, login, profile, refreshToken } = userController(); //desestructura las funciones

    //define las rutas y los métodos HTTP correspondientes
    userRouter.post("/register", register); //ruta post para registrar un usuario
    userRouter.post("/login", login); //ruta post para iniciar sesión
    userRouter.get("/profile/:id", profile); //ruta get para obtener el perfil de un usuario por ID
    userRouter.post("/refresh-token", refreshToken); //ruta post para refrescar el token

    return userRouter; //devuelve el router configurado
};*/
