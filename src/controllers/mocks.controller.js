import { petsService, usersService } from "../services/index.js";
import MockingService from "../services/mocks.service.js";

const getMockingPets = async (req, res) => {
  const pets = await MockingService.generateMockingPets(100);

  res.send({ status: "success", payload: pets });
};

const getMockingUsers = async (req, res) => {
  const users = await MockingService.generateMockingUsers(50);

  res.send({ status: "success", payload: users });
};

const generateData = async (req, res, next) => {
  try {
    const { numUsers, numPets } = req.body;

    let createdUsers = [];
    let createdPets = [];

    if (numUsers) {
      const mockedUsers = await MockingService.generateMockingUsers(numUsers);
      createdUsers = await usersService.createMany(mockedUsers);
    }

    if (numPets) {
      const mockedPets = await MockingService.generateMockingPets(numPets);
      createdPets = await petsService.createMany(mockedPets);
    }

    res.send({
      status: "success",
      payload: {
        users: createdUsers,
        pets: createdPets,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMockingPets,
  getMockingUsers,
  generateData,
};
