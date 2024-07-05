import Joi from 'joi';

export const bodyPaintingSchema = Joi.object({
  title: Joi.string().max(80).required(),
  artist: Joi.string().max(80).required(),
  description: Joi.string().required(),
  year: Joi.number().required(),
});

export const idPaintingSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

export const updatePaintingSchema = Joi.object({
  title: Joi.string().max(80),
  artist: Joi.string().max(80),
  description: Joi.string(),
  year: Joi.number(),
});
