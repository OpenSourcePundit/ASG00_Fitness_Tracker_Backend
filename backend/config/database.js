import mongoose from 'mongoose'

const ConnectDB = async()=>{
    try {
        const con = mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log(`MongoDB connected to ${(await con).connection.host}`)
        
    } catch (error) {
        console.log("Error Connecting to MongoDB: ",error.message)        
    }

}

export default ConnectDB