import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js"
import leadRoutes from "./routes/leadRoutes.js"

dotenv.config();


const app = express();
const allowedOrigins = [
  'http://localhost:2810',         
  process.env.FRONTEND_URL          
];

app.use(cors({
  origin: function(origin, callback) {
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.set('query parser', 'extended');
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.send("Lead management system api is running");
})

app.use("/api/auth" , authRoutes);
app.use("/api/leads",leadRoutes );




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