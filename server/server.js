import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT||5000

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=> console.log("MongoDb connection error:",err));

app.get("/",(req,res)=>{
    res.send("server is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on https://localhost:${PORT}`)
})