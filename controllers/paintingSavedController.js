import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const paintingSavedController = () => {

    
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
            return response.status(httpStatus.CREATED).json(savedPainting)

        } catch (error) {
            next(error)

        } finally {
            await prisma.$disconnect()
        }
    }

    
    return {
        savePainting
    }
}