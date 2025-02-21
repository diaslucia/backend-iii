class CustomError extends Error {
  constructor({ description, message, status }) {
    super(message);
    this.description = description;
    this.status = status;
  }

  static createError(data) {
    return new CustomError(data);
  }
}

export default CustomError;
