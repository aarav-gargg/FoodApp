import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userModel from './models/user.model.js';  
import userRouter from './Routes/userRouter.js';
import plansModel from './models/plans.model.js';
import planRouter from './Routes/planRouter.js';
import reviewModel from './models/review.model.js';
import reviewRouter from './Routes/reviewRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log(error);
    });


// Routers
app.use('/user', userRouter);
app.use('/plans',planRouter);
app.use('/reviews',reviewRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

