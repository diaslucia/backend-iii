export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.error(`[Error] ${statusCode} - ${message}`);

  res.status(statusCode).json({ error: message });
};
