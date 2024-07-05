/*export const handleRequest = (controllerFn) => {
    return async (request, response, next) => {
      try {
        //ejecuta la función del controlador y obtiene la respuesta formateada
        const { status, data, message } = await controllerFn(request);
  
        //envía la respuesta al cliente
        return response.status(status).json({ data, message });
      } catch (error) {
        //pasa el error al middleware de manejo de errores
        next(error);
      } finally {
        //asegura que Prisma se desconecta de la base de datos
        await prisma.$disconnect();
      }
    };
  };*/
  import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handleRequest = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res, next);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect(); // Asegúrate de tener esta línea al final de cada uso de Prisma
  }
};

