const Userdb = require("../models/Usermodel");
const {v4:SessionUid}=require('uuid');
const { SetUserSessionId } = require("../Services/UserAuthService");

const HandleSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Missing Required Fields",
        });
    }

    try {
        const existingUser = await Userdb.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }

        await Userdb.create({ name, email, password });

        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        console.log("Error in HandleSignUp:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};



const HandleUserLogin= async (req,res)=>{
    const {email,password}=await req.body;
    const userrdata=await Userdb.findOne({email,password})
    if (!userrdata){
        return res.status(404).json({
            "error" :"Invalid Email or Password"
    
            })     
    }


    const token=SetUserSessionId(userrdata)
    return res.cookie("UserSessionId",token).status(202).json({

        "Message":"USer lOgged in successfully"
    })



}




module.exports = { HandleSignUp ,HandleUserLogin};
