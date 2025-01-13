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

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/data", authUser, dataUser);
userRouter.post("/updateuser", authUser, updateUser);
userRouter.post("/forgot-password", authUser, forgotPassword);
userRouter.post("/deleteuser", authUser, deleteUser);
userRouter.post("/allusers", adminAuth, allUsers);

export default userRouter;
