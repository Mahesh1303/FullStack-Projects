import bcrypt from "bcrypt";
import { User } from "../db/db.js";
import { signToken } from "../utils/signToken.utils.js";


const handleuserRegistreation = async(req, res) => {
    
    try {
        const { username, voterId, password } = req.body;
        console.log(username)
        console.log(voterId)
        console.log(password)

        const intVoterId =parseInt(voterId)
        
        if(!voterId && !password){
            return res
                    .status(401)
                    .json({
                message: "Please Entre Details"
            })
        };

        const existingVoterId = await User.findFirst({
            where: {
                voterId: intVoterId
            }
        })
        
        if(existingVoterId){
            return res
                    .status(403)
                    .json({
                        message: "VoterId already exist"
                    })
        }

        const saltRounds = 10
        const hashPass = await bcrypt.hash(password, saltRounds);
        
        const user = await User.create({
            data: {
                username: username,
                voterId: intVoterId,
                password: hashPass
            }
        });
    
        if(!user){
            return res
                    .status(403)
                    .json({
                message: "Error in user creation"
            })
        }
    
        return res
                .status(204)
                .json({
                    message: "User created successfully"
                })
    } catch (error) {
        console.log(error)
    }

};

const handleUserLogin = async(req,res) => {

    try {
        const { voterId, password } = req.body;

        const intVoterId = parseInt(voterId)
        console.log(intVoterId)
    
        if(!intVoterId && !password){
            return res
                    .status(401)
                    .json({
                message: "Please Entre Details"
            })
        };
    
        const user = await User.findFirst({
            where: {
                voterId: intVoterId
            }
        });
    
        if(!user){
            return res
                    .status(401)
                    .json({
                        message: "User not not found! Please register"
                    })
        }
    
        const compare = await bcrypt.compare(password, user.password)
    
        if(compare === true){
            
            const token = signToken(user)
    
            return res
                    .status(204)
                    .cookie("session_id", token)
                    .json({
                        message: "user is logged in successfully"
                    })
        }
    
        return res
                .status(401)
                .json({
                    messeage: "Password incoorect"
                })
    } catch (error) {
        console.log(error)
    }
}

const handleUserLogout = (req, res) => {

   try {
     const user = req.user;
 
     if(!user){
         return res
                 .status(401)
                 .json({
                     message: "User is unauthurize"
                 })
     }
 
     return res
             .status(204)
             .clearCookie("session_id")
   } catch (error) {
        console.log(error)
   }
}

// const handleVote = async () => {
//     if (selectedNominee !== null) {
//       try {
//         await axios.post('http://localhost:3030/api/vote', {
//           nomineeId: selectedNominee.id,
//         });
  
//         setHasVoted(true);
//         setError('');
//       } catch (error) {
//         setError('Error while voting, please try again.');
//         console.error(error);
//       }
//     } else {
//       setError('Please select a nominee before casting your vote.');
//     }
//   };
  


export {
    handleuserRegistreation,
    handleUserLogin,
    handleUserLogout
}