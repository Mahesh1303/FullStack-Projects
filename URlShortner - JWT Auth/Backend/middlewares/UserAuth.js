const { GetUserSessionId } = require("../Services/UserAuthService");

const VerifyCookie = (req, res, next) => {
    const sessionId = req.cookies.UserSessionId;

    if (!sessionId) {
        return res.status(401).json({
            message: "No session ID found in cookies"
        });
    }

    const user = GetUserSessionId(sessionId); 

    if (!user) {
        return res.status(401).json({
            message: "No user found with the session ID"
        });
    }

    req.user = user;   //sending the url with the userr

    next();  
};

module.exports = { VerifyCookie };
