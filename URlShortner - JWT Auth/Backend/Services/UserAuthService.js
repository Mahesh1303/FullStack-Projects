const UidMapper=new Map()
const jwt=require('jsonwebtoken')
const secretkey="Mahesh@Tobi"

const SetUserSessionId=(user)=>{

return jwt.sign({
    _id:user._id,
    email:user.email,
    
},secretkey)
}


const GetUserSessionId=(token)=>{
    if (!token) return null;
    return jwt.verify(token,secretkey)
}

module.exports={
    SetUserSessionId,
    GetUserSessionId
}