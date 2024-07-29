import Joi from 'joi'

// Esquema para validar el cuerpo de la solicitud durante el registro de un usuario
export const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
})

// Esquema para validar el cuerpo de la solicitud cuando un usuario inicia sesion
export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})

// Esquema para validar el cuerpo de la solicitud cuando se actualzia un usuario
export const updateProfileSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional()
  })
})
