import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT||5000

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("server is running")
})

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1); 
  }
};

startServer();
