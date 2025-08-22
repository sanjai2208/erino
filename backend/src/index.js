import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";



dotenv.config();


const app = express();
const PORT = process.env.PORT || 2810;
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is running..");
})
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 2810;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
};

startServer();