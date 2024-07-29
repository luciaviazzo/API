const ERROR_HANDLERS = {
  // Manejador para errores de SQL
  sqlError: (response, error) => {
    response
      .status(500)
      .json({
        success: false,
        message: 'A database error occurred.',
        details: error.message
      })
  },
  // Manejador por defecto para otros errores
  defaultError: (response, error) => {
    response
      .status(500)
      .json({
        success: false,
        message: error.message
      })
  }
}

// Middleware para manejar errores
const errorHandler = (error, _request, response, _next) => {
  console.error('Error Handler:', error)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}

export default errorHandler