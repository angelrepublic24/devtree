import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

connectDB()
const app = express();

// Cors
app.use(cors(corsConfig))

// Read from data
app.use(express.urlencoded({extended:true}));
app.use(express.json());




app.use('/api', router)

export default app;