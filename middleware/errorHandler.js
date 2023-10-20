// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);  // Log error stack to console
  
    res.status(500).json({ error: err.message });  // Send error message as JSON response
  };
  