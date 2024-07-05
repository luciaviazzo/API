import { PrismaClient } from '@prisma/client';
import { handleRequest } from '../middlewares/requestHandler.js';

const prisma = new PrismaClient();

export const paintingController = () => {
  const getPaintings = async (request) => {
    const { query } = request;
    const paintings = await prisma.paintings.findMany({
      where: {
        title: {
          contains: query?.title ?? ''
        }
      }
    });
    return {
      status: 200,
      data: paintings,
      message: 'Paintings retrieved successfully'
    };
  };

  const createPainting = async (request) => {
    const newPainting = request.body;
    const createdPainting = await prisma.paintings.create({
      data: newPainting
    });
    return {
      status: 201,
      data: createdPainting,
      message: 'Painting created successfully'
    };
  };

  const getPaintingById = async (request) => {
    const { id } = request.params;
    const paintingId = Number(id);
    const painting = await prisma.paintings.findUnique({
      where: {
        id: paintingId
      }
    });
    return {
      status: 200,
      data: painting,
      message: 'Painting retrieved successfully'
    };
  };

  const deleteById = async (request) => {
    const { id } = request.params;
    const paintingId = Number(id);
    const painting = await prisma.paintings.delete({
      where: {
        id: paintingId
      }
    });
    return {
      status: 200,
      data: painting,
      message: 'Painting deleted successfully'
    };
  };

  const updateById = async (request) => {
    const { id } = request.params;
    const paintingId = Number(id);
    const newPaintingData = request.body;
    const painting = await prisma.paintings.update({
      where: {
        id: paintingId
      },
      data: newPaintingData
    });
    return {
      status: 200,
      data: painting,
      message: 'Painting updated successfully'
    };
  };

  return {
    getPaintings: handleRequest(getPaintings),
    createPainting: handleRequest(createPainting),
    getPaintingById: handleRequest(getPaintingById),
    deleteById: handleRequest(deleteById),
    updateById: handleRequest(updateById)
  };
};


/*//importaciones y configuracion
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//exporta una función que define 
//retorna las funciones del controlador para manejar las operaciones CRUD de las pinturas
export const paintingController = () => {
  const getPaintings = async (request, response, next) => {
    const { query } = request //obtiene los parametros de consulta de la request

    //maneja errores y asegura que prisma se desconecta a la db
    try {
      const paintings = await prisma.paintings.findMany({ //busca pinturas cuyo título contiene el valor del parámetro de consulta "title"
        where: {
          title: {
            contains: query?.title ?? ''
          }
        }
      })
      const responseFormat = {
        data: paintings,
        message: 'Paintings retrieved successfully'
      }
      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const createPainting = async (request, response, next) => {
    const newPainting = request.body //obtiene los datos de la nueva pintura del cuerpo de la request
    try {
      const createdPainting = await prisma.paintings.create({ //crea una nueva pintura con los datos proporcionados
        data: newPainting
      })
      const responseFormat = {
        data: createdPainting,
        message: 'Painting created successfully'
      }
      return response.status(201).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getPaintingById = async (request, response, next) => {
    const { id } = request.params //obtiene el ID de la pintura de los parámetros de la request
    const paintingId = Number(id) //convierte el ID en un numero
    try {
      const painting = await prisma.paintings.findUnique({ //busca una pintura única por su ID
        where: {
          id: paintingId
        }
      })
      const responseFormat = {
        data: painting,
        message: 'Painting retrieved successfully'
      }
      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteById = async (request, response, next) => {
    const { id } = request.params
    const paintingId = Number(id)
    try {
      const painting = await prisma.paintings.delete({ //elimina una pintura por su ID
        where: {
          id: paintingId
        }
      })
      const responseFormat = {
        data: painting,
        message: 'Painting deleted successfully'
      }
      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateById = async (request, response, next) => {
    const { id } = request.params
    const paintingId = Number(id)
    const newPaintingData = request.body //obtiene los datos actualizados de la pintura del cuerpo de la request
    try {
      const painting = await prisma.paintings.update({ //actualiza una pintura en la db con los nuevos datos proporcionados
        where: {
          id: paintingId
        },
        data: newPaintingData
      })
      const responseFormat = {
        data: painting,
        message: 'Painting updated successfully'
      }
      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getPaintings,
    createPainting,
    getPaintingById,
    deleteById,
    updateById
  }
}*/