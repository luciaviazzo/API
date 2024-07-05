import httpStatus from "../helpers/httpStatus.js";
import { generateToken, verifyToken } from "../utils/tokenManagement.js";
import { encrypt, verified } from "../utils/bcrypt.js";
import { PrismaClient } from "@prisma/client";
import { handleRequest } from "../middlewares/requestHandler.js";

const prisma = new PrismaClient();

//exporta una función que define 
//retorna las funciones del controlador para manejar las operaciones de usuarios.
export const userController = () => {
  const register = async (request) => {
    const newUser = request.body; //obtiene los datos de nuevo ususario del cupero de la request
    const hashedPassword = await encrypt(newUser.password);
    newUser.password = hashedPassword;

    const createdUser = await prisma.user.create({ //crea un nuvo usuario con los datos proporcionados
      data: newUser,
    });

    const responseFormat = { //formatea la respuesta con los datos del user y un mensaje de exito
      data: createdUser,
      message: "User created successfully",
    };

    return {
      status: httpStatus.CREATED,
      ...responseFormat
    };
  };

  const login = async (request) => {
    const { email, password } = request.body; //obtiene el mail y password del cuerpo de la request

    const user = await prisma.user.findUnique({ 
      where: {
        email,
      },
    });

    if (!user) {
      return {
        status: httpStatus.NOT_FOUND,
        message: "Invalid credentials",
      };
    }

    const isPasswordValid = await verified(password, user.password); //verifica que las contraseñas coinciden

    if (!isPasswordValid) {
      return {
        status: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials",
      };
    }

    //genera un token JWT y un token de actualización para el usuario
    const token = generateToken({ data: { email, role: user.role } });
    const refreshToken = generateToken({
      data: { email, role: user.role },
      isRefresh: true,
      expiresIn: "7d",
    });

    //formatea la respuesta con un mensaje de éxito, el token y el token de actualización
    return {
      status: httpStatus.OK,
      message: "Login successful",
      token,
      refreshToken,
    };
  };

  const refreshToken = async (request) => {
    const { refreshToken } = request.body; //obtiene el token de actualización del cuerpo de la request

    const { role, email } = verifyToken(refreshToken, true); //verifica el token de actualización y obtiene los datos del usuario
    const token = generateToken({ //genera un nuevo token JWT
      data: { email, role, message: "fressssco" },
    });

    return {
      status: httpStatus.OK,
      success: true,
      token,
    };
  };

  const profile = async (request) => {
    const { id } = request.params;
    const userId = Number(id);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return {
      status: httpStatus.OK,
      data: user,
    };
  };

  return {
    register: handleRequest(register),
    login: handleRequest(login),
    profile: handleRequest(profile),
    refreshToken: handleRequest(refreshToken),
  };
};
/*//importaciones y configuracion 
import httpStatus from "../helpers/httpStatus.js";
import { generateToken, verifyToken } from "../utils/tokenManagement.js";
import { encrypt, verified } from "../utils/bcrypt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//exporta una función que define 
//retorna las funciones del controlador para manejar las operaciones de usuarios.
export const userController = () => {
  const register = async (request, response, next) => {
    const newUser = request.body; //obtiene los datos de nuevo ususario del cupero de la request
    const hashedPassword = await encrypt(newUser.password);
    newUser.password = hashedPassword;

    try {
      const createdUser = await prisma.user.create({ //crea un nuvo usuario con los datos proporcionados
        data: newUser,
      });

      const responseFormat = { //formatea la respuesta con los datos del user y un mensaje de exito
        data: createdUser,
        message: "User created successfully",
      };

      return response.status(httpStatus.CREATED).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const login = async (request, response, next) => {
    const { email, password } = request.body; //obtiene el mail y password del cuerpo de la request

    try {
      const user = await prisma.user.findUnique({ 
        where: {
          email,
        },
      });

      if (!user) {
        return response.status(httpStatus.NOT_FOUND).json({
          message: "Invalid credentials",
        });
      }

      const isPasswordValid = await verified(password, user.password); //verifica que las contraseñas coinciden

      if (!isPasswordValid) {
        return response.status(httpStatus.UNAUTHORIZED).json({
          message: "Invalid credentials",
        });
      }

      //genera un token JWT y un token de actualización para el usuario
      const token = generateToken({ data: { email, role: user.role } });
      const refreshToken = generateToken({
        data: { email, role: user.role },
        isRefresh: true,
        expiresIn: "7d",
      });

      //formatea la respuesta con un mensaje de éxito, el token y el token de actualización
      return response.status(httpStatus.OK).json({
        message: "Login successful",
        token,
        refreshToken,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const refreshToken = async (request, response, next) => {
    const { refreshToken } = request.body; //obtiene el token de actualización del cuerpo de la request

    try {
      const { role, email } = verifyToken(refreshToken, true); //erifica el token de actualización y obtiene los datos del usuario
      const token = generateToken({ //genera un nuevo token JWT
        data: { email, role, message: "fressssco" },
      });

      return response.status(httpStatus.OK).json({ //formatea la respuesta con el nuevo token
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  const profile = async (request, response, next) => {
    const { id } = request.params;
    const userId = Number(id);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return response.status(httpStatus.OK).json({
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    register,
    login,
    profile,
    refreshToken,
  };
};*/
