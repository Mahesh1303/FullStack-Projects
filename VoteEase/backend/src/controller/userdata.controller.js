import { request } from "express";
import { User } from "../db/db.js";

const handleUserData= async ( req,res)=>{

    try {
        const user = req.user
    
        if(!user){
                return res
                        .status(401)
                        .json({
                            message: "User is un authorize"
                        })
        }
    
        const userData = await User.findUnique({
            where:{
                id: user.id
            },
            select: {
                password: false,
                id: true,
                voterId: true,
                username: true,
            }
        })
    
        return res
                .status(200)
                .json({
                    message: "User Data is fetched succefully",
                    userData
                })
    } catch (error) {
        console.log(error)
    }
}

export {
    handleUserData
}