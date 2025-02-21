import {
  AdoptionNotFound,
  PetNotAvaliable,
  PetNotFound,
  UserNotFound,
  BadRequest,
} from "../services/errors/errors.dictionary.js";
import {
  adoptionsService,
  petsService,
  usersService,
} from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  const result = await adoptionsService.getAll();
  res.send({ status: "success", payload: result });
};

const getAdoption = async (req, res, next) => {
  const adoptionId = req.params.aid;
  if (!adoptionId) return next(BadRequest);

  const adoption = await adoptionsService.getBy({ _id: adoptionId });
  if (!adoption) return next(AdoptionNotFound);

  res.send({ status: "success", payload: adoption });
};

const createAdoption = async (req, res, next) => {
  const { uid, pid } = req.params;

  if (!uid || !pid) return next(BadRequest);

  const user = await usersService.getUserById(uid);
  if (!user) return next(UserNotFound);

  const pet = await petsService.getBy({ _id: pid });
  if (!pet) return next(PetNotFound);
  if (pet.adopted) return next(PetNotAvaliable);

  user.pets.push(pet._id);
  await usersService.update(user._id, { pets: user.pets });
  await petsService.update(pet._id, { adopted: true, owner: user._id });
  await adoptionsService.create({ owner: user._id, pet: pet._id });
  res.send({ status: "success", message: "Pet adopted" });
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};
