import { Router } from "express";
import { handleuserRegistreation, handleUserLogin, handleUserLogout } from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes
    .post("/register", handleuserRegistreation)
    .post("/login", handleUserLogin)
    .get("/logout", handleUserLogout)


export default userRoutes