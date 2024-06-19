//Guarda los metodos

import { Router } from 'express' //Router que me bridna express
import { paintingsController } from '../controllers/paintingsController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyPintingSchema, updatePaintingSchema } from '../schemas/paintingsSchemas.js'

export const paintingRoutes = () => {
  const paintingRoutes = Router()
  const { getPainting, createPainting, getPaintingById, deleteById, updateById } = paintingsController()

  //Agrupo los request de acuerdo a las rutas
  paintingRoutes.route('/paintings')
    .get(getPainting)
    .post(schemaValidator(bodyPintingSchema), createPainting)

  paintingRoutes.route('/paintings/:id')
    .get(getPaintingById)
    .delete(deleteById)
    .patch(schemaValidator(updatePaintingSchema), updateById)

  return paintingRoutes
}