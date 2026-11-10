import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
// Agregar aquí las rutas y errores (láminas 11 a 16).
await mongoose.connect(process.env.MONGODB_URI);
app.listen(3000);