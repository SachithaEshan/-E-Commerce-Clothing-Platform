import express from "express";

import {
  loginUser,
  registerUser,
  adminLogin,
  dataUser,
  updateUser,
  deleteUser,
  allUsers,
  forgotPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/data", dataUser);
userRouter.post("/updateuser", updateUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password");
userRouter.post("/deleteuser", deleteUser);
userRouter.post("/allusers", allUsers);

export default userRouter;
