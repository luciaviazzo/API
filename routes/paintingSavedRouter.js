import { Router } from 'express'
import { paintingSavedController } from '../controllers/paintingSavedController.js'


export const paintingSavedRoutes = () => {
    const paintingSavedRouter = Router()
    const { paintingSaved } = paintingSavedController()

    paintingSavedRouter.post('/painting-saved', paintingSaved)

    return paintingSavedRouter
}