import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("Connection is being established to the database")
        console.log(`MongoDB host : ${connection.connection.host}`)
    } catch (error) {
        console.error("Connection string error check connect.db.js file",error)
        process.exit(1) 
    }
}

export default connectToDb;