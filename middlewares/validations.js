import Joi from 'joi'

/**
 * Middleware para validar los datos de la solicitud contra un esquema dado.
 * @param {Joi.Schema} schema - Esquema Joi para validar la solicitud.
 * @returns {Function} Middleware de validación.
 */

//valida que sea un objeto
export const schemaValidator = (schema) => async (request, response, next) => {
  const { error } = schema.validate({
    body: request.body,
    params: request.params,
    query: request.query
  }, {
    abortEarly: false, // Para que se validen todos los campos y no se aborte al primer error
    allowUnknown: true // Para permitir parámetros desconocidos en la solicitud
  })
  
  error ? next(error) : next()
}
