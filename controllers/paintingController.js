import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const paintingController = () => {
  const getPaintings = async (request, response, next) => {
    const { query } = request

    try {
      const paintings = await prisma.paintings.findMany({
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
    const newPainting = request.body
    try {
      const createdPainting = await prisma.paintings.create({
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
    const { id } = request.params
    const paintingId = Number(id)
    try {
      const painting = await prisma.paintings.findUnique({
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
      const painting = await prisma.paintings.delete({
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
    const newPaintingData = request.body
    try {
      const painting = await prisma.paintings.update({
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
}