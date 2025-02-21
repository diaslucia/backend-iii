import PetDTO from "../dto/Pet.dto.js";
import { BadRequest } from "../services/errors/errors.dictionary.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
  const pets = await petsService.getAll();
  res.send({ status: "success", payload: pets });
};

const createPet = async (req, res, next) => {
  const { name, specie, birthDate } = req.body;
  if (!name || !specie || !birthDate) return next(BadRequest);

  const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
  const result = await petsService.create(pet);
  res.send({ status: "success", payload: result });
};

const updatePet = async (req, res, next) => {
  const petUpdateBody = req.body;
  const petId = req.params.pid;
  if (!petId || !petUpdateBody) return next(BadRequest);

  await petsService.update(petId, petUpdateBody);
  res.send({ status: "success", message: "pet updated" });
};

const deletePet = async (req, res, next) => {
  const petId = req.params.pid;
  if (!petId) return next(BadRequest);

  await petsService.delete(petId);
  res.send({ status: "success", message: "pet deleted" });
};

const createPetWithImage = async (req, res, next) => {
  const file = req.file;
  const { name, specie, birthDate } = req.body;
  if (!name || !specie || !birthDate) return next(BadRequest);

  const pet = PetDTO.getPetInputFrom({
    name,
    specie,
    birthDate,
    image: `${__dirname}/../public/img/${file.filename}`,
  });

  const result = await petsService.create(pet);
  res.send({ status: "success", payload: result });
};
export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};
