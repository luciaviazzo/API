import HTTP_STATUS from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const paintingSavedController = () => {

    // Guarda una pintura asociada a un usuario
    const savePainting = async (request, response, next) => {

        const { body } = request
        const paintingId = Number(body?.paintingId ?? null)
        const userId = Number(body?.userId ?? null)

        try {
            const savedPainting = await prisma.userSavedPaintings.create({
                data: {
                    paintingId,
                    userId
                }
            })
            return response.status(HTTP_STATUS.CREATED).json(savedPainting)

        } catch (error) {
            next(error)

        } finally {
            await prisma.$disconnect()
        }
    }

    // Devuelve todas las pinturas guardadas por un usuario
    const getAllSavedPaintingsById = async (request, response, next) => {

        const { params } = request
        const userId = Number(params?.id)

        try {
            const savedPaintings = await prisma.userSavedPaintings.findMany({
                where: {
                    userId
                },
                select: {
                    paintingId: true,
                    userId: true,
                    painting: {
                        select: {
                            title: true,
                            author: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                        }
                    }
                },
            })
            return response.status(HTTP_STATUS.CREATED).json(savedPaintings)

        } catch (error) {
            next(error)

        } finally {
            await prisma.$disconnect()
        }
    }


    return {
        savePainting,
        getAllSavedPaintingsById
    }
}