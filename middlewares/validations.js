import Joi from 'joi'

/**
 * @param {Joi.Schema} schema - Esquema Joi para validar la solicitud.
 * @returns {Function} Middleware de validación.
 */

// Valida que sea un objeto
export const schemaValidator = (schema) => async (request, _response, next) => {
  const { error } = schema.validate(
    {
      body: request.body,
      params: request.params,
      query: request.query
    },
    {
      abortEarly: false, // Para que se validen todos los campos y no se aborte al primer error
      allowUnknown: true // Para permitir parametros desconocidos en la solicitud
    }
  )

  error ? next(error) : next()
}