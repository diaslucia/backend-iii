import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

/* Routes */
router.get("/", usersController.getAllUsers);
router.post("/", usersController.postUser);
router.get("/:uid", usersController.getUser);
router.put("/:uid", usersController.updateUser);
router.delete("/:uid", usersController.deleteUser);

export default router;
