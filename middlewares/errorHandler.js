const ERROR_HANDLERS = {
  //agregar mas errores
  sqlError: () => { },

  defaultError: (response, error) => {
    response
      .status(500)
      .json({
        success: false,
        message: error.message
      })
  }
}

const errorHandler = (error, _request, response, _next) => {
  console.error('Error Handler')

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}

export default errorHandler