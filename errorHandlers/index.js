function errorHandlers(app) {
  
  // 404 Not found
  app.use((req, res) => {
    res.status(404).json({errorMessage: "Route not found"})
  })
  
  // 500 Server Error
  app.use((error, req, res, next) => {
    // just by having 4 parameters it will behave differently from the one above. Behave like a 500 error handler.
    console.log(error)
    res.status(500).json({errorMessage: "Something went wrong, try again later or contact the backend devs"})
  })

}


module.exports = errorHandlers