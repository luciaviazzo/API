import { Router } from 'express'
import { paintingSavedController } from '../controllers/paintingSavedController.js'


export const paintingSavedRoutes = () => {
    
    const paintingSavedRouter = Router()
    const { savePainting } = paintingSavedController()

    paintingSavedRouter.post('/painting-saved', savePainting)

    return paintingSavedRouter
}