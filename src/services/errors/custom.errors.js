class CustomError {
  static createError({
    title = "Error",
    description = "Unknown",
    message = "Try again",
    status = "1",
  }) {
    const error = new Error(message);
    error.title = title;
    error.description = description;
    error.status = status;
    return error;
  }
}

export default CustomError;
