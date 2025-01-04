const mongoose=require('mongoose')



const MongoConnection=async(url)=>{

    mongoose.connect(url)


}


module.exports={MongoConnection}