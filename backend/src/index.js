import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2810;
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is running..");
})
app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
})