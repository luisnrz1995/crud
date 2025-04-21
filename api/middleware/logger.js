const logger = (req, res, next) => {
  const tiempo = new Date().toLocaleString();
  console.log(`[${tiempo}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
