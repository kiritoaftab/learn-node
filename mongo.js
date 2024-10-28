import mongoose from "mongoose"
const MONGO_URI = "mongodb+srv://aftabemir123:0m4YcuA2T29kYBHd@cluster0.nqsas.mongodb.net/haseena";

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

const mongooseConnection = async()=>{

    try{
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`error :${error.message}`)
        process.exit(1);
    }
}    

export default mongooseConnection;