import { Router } from 'express'
import { paintingController } from '../controllers/paintingController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyPaintingSchema, updatePaintingSchema } from '../schemas/paintingSchemas.js'

export const paintingRoutes = () => {
  const paintingRouter = Router()
  const { getPaintings, createPainting, getPaintingById, deleteById, updateById } = paintingController()

  paintingRouter.route('/paintings')
    .get(getPaintings)
    .post(schemaValidator(bodyPaintingSchema), createPainting)

  paintingRouter.route('/paintings/:id')
    .get(getPaintingById)
    .delete(deleteById)
    .patch(schemaValidator(updatePaintingSchema), updateById)

  return paintingRouter
}