import { Router } from 'express'
import { paintingController } from '../controllers/paintingController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyPaintingSchema, updatePaintingSchema } from '../schemas/paintingSchemas.js'
import { isAdmin } from '../middlewares/checkRole.js'

export const paintingRoutes = () => {
  const paintingRouter = Router()
  const { getPaintings, createPainting, getPaintingById, deleteById, updateById, getPaintingsByAuthor } = paintingController()

  paintingRouter.route('/paintings')
    .get(getPaintings)
    .post(isAdmin, schemaValidator(bodyPaintingSchema), createPainting)

  paintingRouter.route('/paintings/:id')
    .get(getPaintingById)
    .delete(deleteById)
    .patch(schemaValidator(updatePaintingSchema), updateById)

  paintingRouter.route('/paintings/author/:author')
    .get(getPaintingsByAuthor)

  return paintingRouter
}