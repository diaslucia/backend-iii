import CustomError from "./custom.errors.js";

export const UserNotFound = CustomError.createError(
  "User not found",
  "User hasn't been found",
  "User not found",
  400
);
export const AdoptionNotFound = CustomError.createError(
  "Adoption not found",
  "Adoption hasn't been found",
  "Adoption not found",
  400
);
export const PetNotFound = CustomError.createError(
  "Pet not found",
  "Pet hasn't been found",
  "Pet not found",
  400
);
export const PetNotAvaliable = CustomError.createError(
  "Pet is not avaliable",
  "Pet is not avaliable for adoption",
  "Pet is not avaliable",
  400
);
export const BadRequest = CustomError.createError(
  "Bad Request",
  "Incomplete values",
  "Bad Request",
  400
);
