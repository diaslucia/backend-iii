import UserDTO from "../dto/User.dto.js";
import {
  UserNotFound,
  BadRequest,
  EmailAlreadyRegister,
} from "../services/errors/errors.dictionary.js";
import { usersService } from "../services/index.js";
import { createHash } from "../utils/index.js";

const getAllUsers = async (req, res, next) => {
  const users = await usersService.getAll();
  res.send({ status: "success", payload: users });
};

const postUser = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) return next(BadRequest);

  const existingUser = await usersService.getUserByEmail(email);
  if (existingUser) return next(EmailAlreadyRegister);

  const hashPass = await createHash(password);
  const user = await UserDTO.getUserInputFrom({
    first_name,
    last_name,
    email,
    hashPass,
  });
  const result = await usersService.create(user);
  res.send({ status: "success", payload: result });
};

const getUser = async (req, res, next) => {
  const userId = req.params.uid;
  if (!userId) return next(BadRequest);

  const user = await usersService.getUserById(userId);
  if (!user) return next(UserNotFound);

  res.send({ status: "success", payload: user });
};

const updateUser = async (req, res, next) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  if (!userId) return next(BadRequest);

  const user = await usersService.getUserById(userId);
  if (!user) return next(UserNotFound);

  await usersService.update(userId, updateBody);
  res.send({ status: "success", message: "User updated" });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  if (!userId) return next(BadRequest);

  const user = await usersService.getUserById(userId);
  if (!user) return next(UserNotFound);

  res.send({ status: "success", message: "User deleted" });
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  postUser,
};
