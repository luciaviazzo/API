import Joi from 'joi'

export const bodyPaintingSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().max(80).required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.number().optional().prefs({ convert: false }),
  })
})

export const idPaintingSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Must be a number').required()
  })
})

export const updatePaintingSchema = Joi.object({
  body: bodyPaintingSchema.extract('body'),
  params: idPaintingSchema.extract('params')
})
