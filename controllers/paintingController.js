import { PrismaClient } from '@prisma/client'
import HTTP_STATUS from '../helpers/httpStatus.js'

const prisma = new PrismaClient()

export const paintingController = () => {

  // Devuelve todas las pinturas, opcionalmente filtrando por título
  const getPaintings = async (request, response, next) => {
    const { query } = request

    try {
      const paintings = await prisma.painting.findMany({
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

      return response.status(HTTP_STATUS.OK).json(responseFormat)

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Crea una nueva pintura
  const createPainting = async (request, response, next) => {
    const newPainting = request.body

    try {
      const createdPainting = await prisma.painting.create({
        data: newPainting
      })

      const responseFormat = {
        data: createdPainting,
        message: 'Painting created successfully'
      }

      return response.status(HTTP_STATUS.CREATED).json(responseFormat)

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Devuelve una pintura a partir de su ID
  const getPaintingById = async (request, response, next) => {
    const { id } = request.params
    const paintingId = Number(id)

    try {
      const painting = await prisma.painting.findUnique({
        where: {
          id: paintingId
        }
      })

      if (!painting) {
        return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Painting not found' })
      }

      const responseFormat = {
        data: painting,
        message: 'Painting retrieved successfully'
      }

      return response.status(HTTP_STATUS.OK).json(responseFormat)

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Elimina una pintura a partir de su ID
  const deleteById = async (request, response, next) => {
    const { id } = request.params
    const paintingId = Number(id)

    try {
      const painting = await prisma.painting.delete({
        where: {
          id: paintingId
        }
      })

      const responseFormat = {
        data: painting,
        message: 'Painting deleted successfully'
      }

      return response.status(HTTP_STATUS.OK).json(responseFormat)

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Actualiza los datos de una pintura a partir de su ID
  const updateById = async (request, response, next) => {
    const { id } = request.params
    const paintingId = Number(id)
    const newPaintingData = request.body

    try {
      const painting = await prisma.painting.update({
        where: {
          id: paintingId
        },
        data: newPaintingData
      })

      const responseFormat = {
        data: painting,
        message: 'Painting updated successfully'
      }

      return response.status(HTTP_STATUS.OK).json(responseFormat)

    } catch (error) {
      next(error)

    } finally {
      await prisma.$disconnect()
    }
  }

  // Devuelve todas las pìnturas de un autor especifico 
  const getPaintingsByAuthor = async (request, response, next) => {
    const { author } = request.params

    try {
      const paintings = await prisma.painting.findMany({
        where: {
          artist: {
            contains: author,
            mode: 'insensitive'
          }
        }
      })

      if (paintings.length === 0) {
        return response.status(HTTP_STATUS.NOT_FOUND).json({ message: 'No paintings found for this author' })
      }

      const responseFormat = {
        data: paintings,
        message: 'Paintings by author retrieved successfully'
      }

      return response.status(HTTP_STATUS.OK).json(responseFormat)

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
    updateById,
    getPaintingsByAuthor
  }
}