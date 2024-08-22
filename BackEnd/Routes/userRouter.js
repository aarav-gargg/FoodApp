import express from "express";
import jwt from "jsonwebtoken"
import { updateUser, deleteUser, getUser, getAllUsers } from "../Controller/userController.js";
import { signup, login, protectRoute, isAuthorized, forgotpassword, resetPassword, logout } from "../Controller/authController.js";

const userRouter = express.Router();

userRouter.route("/:id")
    .patch(updateUser)
    .delete(deleteUser)


userRouter.route("/signup")
    .post(signup);

userRouter.route("/login")
    .post(login);

userRouter.route("/forgotpassword")
    .post(forgotpassword)

userRouter.route("resetpassword/:token")
    .post(resetPassword)

userRouter.route("/logout")
    .get(logout)

userRouter.use(protectRoute)

userRouter.route("/profile")
    .get(getUser)

userRouter.use(isAuthorized(['admin']));

userRouter.route("/")
    .get(getAllUsers)




export default userRouter;