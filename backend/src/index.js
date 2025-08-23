import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js"
dotenv.config();


const app = express();
const PORT = process.env.PORT || 2810;
app.use(cors({
  origin : 'http://localhost:5173',
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.send("Lead management system api is running");
})

app.use("/api/auth" , authRoutes);





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