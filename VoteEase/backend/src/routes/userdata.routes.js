import { Router } from "express";
import { handleUserData } from "../controller/userdata.controller.js";
import { checkAuth } from "../middlewares/checkauth.middlewares.js";

const userDataRoutes = Router();

userDataRoutes.use(checkAuth)

userDataRoutes
        .get("/", handleUserData)
    
export default userDataRoutes