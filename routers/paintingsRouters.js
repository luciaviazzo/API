//Guarda los metodos

import { Router } from 'express' //Router nque me bridna express
import { paintingsController } from '../controllers/paintingsController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyPintingSchema, updatePaintingSchema } from '../schemas/paintingsSchemas.js'

export const paintingRouter = () => {
  const paintingRouter = Router()
  const { getPainting, createPainting, getPaintingById, deleteById, updateById } = paintingsController()

  paintingRouter.route('/paintings')
    .get(getPainting)
    .post(schemaValidator(bodyPintingSchema), createPainting)

    paintingRouter.route('/paintings/:id')
    .get(getPaintingById)
    .delete(deleteById)
    .patch(schemaValidator(updatePaintingSchema), updateById)

  return paintingRouter
}