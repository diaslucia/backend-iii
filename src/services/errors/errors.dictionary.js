import CustomError from "./custom.errors.js";

export const UserNotFound = CustomError.createError({
  description: "User hasn't been found",
  message: "User not found",
  status: 404,
});

export const UserAlreadyExists = CustomError.createError({
  description: "There is an email associated with this account",
  message: "User already registered",
  status: 409,
});

export const UserDoesntExists = CustomError.createError({
  description: "There is no account associated with this email",
  message: "User doesn't exists",
  status: 409,
});

export const EmailAlreadyRegister = CustomError.createError({
  description: "There is an email associated with this account",
  message: "Email already registered",
  status: 409,
});

export const AdoptionNotFound = CustomError.createError({
  description: "Adoption hasn't been found",
  message: "Adoption not found",
  status: 404,
});

export const PetNotFound = CustomError.createError({
  description: "Pet hasn't been found",
  message: "Pet not found",
  status: 404,
});

export const PetNotAvaliable = CustomError.createError({
  description: "Pet is not available for adoption",
  message: "Pet is not available",
  status: 409,
});

export const BadRequest = CustomError.createError({
  description: "Incomplete values",
  message: "Bad Request",
  status: 400,
});

export const InvalidPassword = CustomError.createError({
  description: "Invalid password",
  message: "Invalid password",
  status: 401,
});
