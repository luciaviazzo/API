import { Router } from 'express'
import { paintingSavedController } from '../controllers/paintingSavedController.js'


export const paintingSavedRoutes = () => {

    const paintingSavedRouter = Router()
    const { savePainting, getAllSavedPaintingsById } = paintingSavedController()

    paintingSavedRouter.route('/painting-saved')
        .post(savePainting)

    paintingSavedRouter.route('/painting-saved/:id')
        .get(getAllSavedPaintingsById)

    return paintingSavedRouter
}