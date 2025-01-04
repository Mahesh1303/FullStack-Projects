import { Router } from "express";
import { checkAuth } from "../middlewares/checkauth.middlewares.js";


const secureRoute = Router();

secureRoute.get("/",checkAuth, (req,res) => {
    
    const user = req.user;

    if(!user){
        return res
                .status(4)
                .json({
                    message: "User is unauthorize"
                })
    }

    const token = req.cookies?.session_id;



    return res
            .status(204)
            .json({
                message: "User is Authenticated",
                token: token,
                user: user
            })

})

export default secureRoute