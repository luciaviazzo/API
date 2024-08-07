import Joi from 'joi'

// Esquema para validar el cuerpo de la solicitud
export const bodyPaintingSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().max(80).required(),
    author: Joi.string().required(),
    description: Joi.string().optional(),
    year: Joi.number().required().prefs({ convert: false }), // No convierete en string
  })
})

// Esquema para validar el ID
export const idPaintingSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Must be a number').required()
  })
})

// Esquema que combina la validacion de los esquemas anteriores
export const updatePaintingSchema = Joi.object({
  body: bodyPaintingSchema.extract('body'),
  params: idPaintingSchema.extract('params')
})