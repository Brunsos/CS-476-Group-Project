// packages
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';


//utiles
import connectDB from './config/db.js';

dotenv.config();
const port =process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cookieParser());

app.get("/",(req,res) => {
   res.send("Hello world");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));