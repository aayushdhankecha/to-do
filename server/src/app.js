import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express, { json } from 'express';
import mongoose from 'mongoose';
import apiRoute, { apiProtected } from './routes/api.js';
import bodyParser from 'body-parser';
import { DB_LINK } from './utils/constatnts.js';
import AuthMiddleware from './middlewares/Auth.js';
// import env from 'dotenv';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_LINK)
    .then(()=>{console.log("DataBase connection successful")})
    .catch((e)=>{console.log("Database err " + e)});

const port = process.env.PORT || process.env.X

apiRoute.post('/register',apiRoute);
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);

app.listen(port,()=>{
    console.log("Server is running on port " + port);
})
