import { UserNotFound } from "../services/errors/errors.dictionary.js";
import { usersService } from "../services/index.js";

const getAllUsers = async (req, res, next) => {
  const users = await usersService.getAll();
  res.send({ status: "success", payload: users });
};

const getUser = async (req, res, next) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user) return next(UserNotFound);
  res.send({ status: "success", payload: user });
};

const updateUser = async (req, res, next) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user) return next(UserNotFound);
  await usersService.update(userId, updateBody);
  res.send({ status: "success", message: "User updated" });
};

const deleteUser = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user) return next(UserNotFound);
  res.send({ status: "success", message: "User deleted" });
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
