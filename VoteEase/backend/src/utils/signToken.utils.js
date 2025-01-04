import jwt from "jsonwebtoken";

const sceretKey = process.env.JWT_SECRET_KEY;

const signToken = (user) => {
    
    const payload = {
        id: user.id,
        username: user.username
    };


    const token = jwt.sign(payload,sceretKey)

    return token;
}

const validateToken = (token, res) => {

    if(!token){
        return res
                .status(401)
                .json*({
                    message: "Token nt found while validation"
                })
    }

    const data = jwt.verify(token, sceretKey);

    return data;
}

export {
    signToken,
    validateToken   
}