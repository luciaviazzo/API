import Joi from 'joi';

export const schemaValidator = (schema) => async (request, response, next) => {
  try {
    const { error } = await schema.validate({
      ...request.body,
      ...request.params,
      ...request.query
    }, {
      abortEarly: false,
      allowUnknown: true
    });

    if (error) {
      return response.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details
      });
    }

    next(); // Si la validación es exitosa, pasa al siguiente middleware
  } catch (error) {
    next(error); // Maneja cualquier error de validación
  }
};
