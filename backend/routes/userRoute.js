import express from "express";

import {
  loginUser,
  registerUser,
  adminLogin,
  dataUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/data", dataUser);
userRouter.post("/updateuser", updateUser);
userRouter.post("/deleteuser", deleteUser);

export default userRouter;
