import { validateToken } from "../utils/signToken.utils.js";

export const checkAuth = (req, res, next) => {

    const token = req.cookies["session_id"];

    if(!token){
        return res
                .status(401)
                .json({
                    message: "Token not found"
                })
    }

    const user = validateToken(token, res)

    req.user = user;

    next()
}