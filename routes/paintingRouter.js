import express from 'express';
import { paintingController } from '../controllers/paintingController.js';
import { schemaValidator } from '../middlewares/validations.js';
import { bodyPaintingSchema, idPaintingSchema, updatePaintingSchema } from '../schemas/paintingSchemas.js';

const router = express.Router();
const { getPaintings, createPainting, getPaintingById, deleteById, updateById } = paintingController();

router.get('/', getPaintings);
router.post('/', schemaValidator({ body: bodyPaintingSchema }), createPainting);
router.get('/:id', schemaValidator({ params: idPaintingSchema }), getPaintingById);
router.delete('/:id', schemaValidator({ params: idPaintingSchema }), deleteById);
router.put('/:id', schemaValidator({ body: updatePaintingSchema }), updateById);

export default router;



/*//importaciones
import { Router } from "express";
import { paintingController } from "../controllers/paintingController.js";
import { schemaValidator } from "../middlewares/validations.js";
import { bodyPaintingSchema, updatePaintingSchema } from "../schemas/paintingsSchemas.js";

export const paintingRoutes = () => { 
  const paintingRouter = Router(); //crea una nueva instancia de router
  const { getPaintings, createPainting, getPaintingById, deleteById, updateById } = paintingController(); //desestructura las funciones del controller

  //define las rutas y los métodos HTTP correspondientes
  paintingRouter
    .route("/paintings")
    .get(getPaintings) //ruta get para obtener todas las pinturas
    .post(schemaValidator(bodyPaintingSchema), createPainting); //ruta post para crear una pintura con validacion

  paintingRouter
    .route("/paintings/:id")
    .get(getPaintingById) //ruta get para obtener una pintura por ID
    .delete(deleteById) //ruta delete para eliminar una pintura por ID
    .patch(schemaValidator(updatePaintingSchema), updateById); //ruta patch para actualizar una pintura por ID con validacion

  return paintingRouter; //devuelve el router configurado
};*/
