module.exports = (req, res, next) => {
  const { method, originalUrl } = req;
  const time = new Date().toISOString();
  console.log(`[${time}] ${method} ${originalUrl}`);
  next();
};
