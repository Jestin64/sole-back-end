import express from "express";
import {addUser, login} from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUser);
router.post("/login", login);

export default router;