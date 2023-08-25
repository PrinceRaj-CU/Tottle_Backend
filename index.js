import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./router/router.js";
dotenv.config();
const app=express();

app.use(express.json());
app.use(cors()); 

app.get('/', function (req, res) { 
    res.send('Api is working!');
})

import mongoseConnection from "./dbconfig.js";
mongoseConnection();
app.use("/api/v1", router);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `); 
});
     