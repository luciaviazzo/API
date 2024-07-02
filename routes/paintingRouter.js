//Guarda los metodos
import { Router } from 'express' //Router que me bridna express
import { paintingController } from '../controllers/paintingController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyPintingSchema, updatePaintingSchema } from '../schemas/paintingsSchemas.js'

export const paintingRoutes = (PAINTINGS) => {
  const paintingRouter = Router()
  const { getPaintings, createPainting, getPaintingById, deleteById, updateById } = paintingsController()

  //Agrupo los request de acuerdo a las rutas
  paintingRouter.route('/paintings')
    .get(getPaintings)
    .post(schemaValidator(bodyPintingSchema), createPainting)

  paintingRouter.route('/paintings/:id')
    .get(getPaintingById)
    .delete(deleteById)
    .patch(schemaValidator(updatePaintingSchema), updateById)

  return paintingRouter
}
