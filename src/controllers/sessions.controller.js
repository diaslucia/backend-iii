import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/User.dto.js";
import {
  BadRequest,
  InvalidPassword,
  UserDoesntExists,
  UserAlreadyExists,
} from "../services/errors/errors.dictionary.js";

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      return next(BadRequest);

    const exists = await usersService.getUserByEmail(email);
    if (exists) return next(UserAlreadyExists);

    const hashedPassword = await createHash(password);
    const user = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    let result = await usersService.create(user);
    res.send({ status: "success", payload: result._id });
  } catch (error) {}
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(BadRequest);

  const user = await usersService.getUserByEmail(email);
  if (!user) return next(UserDoesntExists);

  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword) return next(InvalidPassword);

  const userDto = UserDTO.getUserTokenFrom(user);
  const token = jwt.sign(userDto, "tokenSecretJWT", { expiresIn: "1h" });
  res
    .cookie("coderCookie", token, { maxAge: 3600000 })
    .send({ status: "success", message: "Logged in" });
};

const current = async (req, res) => {
  const cookie = req.cookies["coderCookie"];
  const user = jwt.verify(cookie, "tokenSecretJWT");
  if (user) return res.send({ status: "success", payload: user });
};

const unprotectedLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(BadRequest);

  const user = await usersService.getUserByEmail(email);
  if (!user) return next(UserDoesntExists);

  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword) return next(InvalidPassword);

  const token = jwt.sign(user, "tokenSecretJWT", { expiresIn: "1h" });
  res
    .cookie("unprotectedCookie", token, { maxAge: 3600000 })
    .send({ status: "success", message: "Unprotected Logged in" });
};
const unprotectedCurrent = async (req, res) => {
  const cookie = req.cookies["unprotectedCookie"];
  const user = jwt.verify(cookie, "tokenSecretJWT");
  if (user) return res.send({ status: "success", payload: user });
};
export default {
  current,
  login,
  register,
  current,
  unprotectedLogin,
  unprotectedCurrent,
};
