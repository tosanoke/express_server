import express from "express";
const router = express.Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controller/controller";
import userValidate  from '../validation/userValidation';
import { checkSchema } from "express-validator";

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", checkSchema(userValidate), createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
