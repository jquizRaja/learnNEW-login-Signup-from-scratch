import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.DATABASE_URL!)
        const connection=mongoose.connection

        connection.on('connected',()=>{
            console.log("MongoDB💾🤝 Connected Successfully🎈🎆✅👍🎈")
        })

        connection.on("error",(err)=>{
            console.log('MongoDB💾🌋🌋❌☠️🎌🤞🤞Please make sure MongoDB is 🏃🏃🏃' + err)
            process.exit()
        })
    } catch (error) {
        console.log("Something Went Wrong")
        console.log(error)        
    }
}

export default connect()