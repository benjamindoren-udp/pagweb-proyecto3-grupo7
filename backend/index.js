import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {MongoClient} from 'mongodb'
const app = express();
const PORT = 3000;

const cliente = new MongoClient(process.env.MONGODB_URI)
app.use(cors());
app.use(express.json())
app.get('/api/sucursales', async (req, res) => {
  try {
    await cliente.connect();
    const db = cliente.db('MarketOps');
    const datos = await db.collection('Equipos').find().toArray();
    const colecciones = await db.listCollections().toArray();
    console.log('Colecciones disponibles:', colecciones.map(c => c.name));
    res.status(200).json(datos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});


const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(PORT);
        console.log('servidor iniciado');
    }catch (err) {
  console.error("Error detallando conexión a Mongo:", err);
};

};



startServer();







