import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {MongoClient, ObjectId} from 'mongodb';
const app = express();
const PORT = 3000;


const sucursalSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slug: String,
  working: [Number],
  failures: [
    {
      id: Number,
      description: String
    }
  ],
  outOfService: [Number]
});

const Sucursal = mongoose.model('Sucursal', sucursalSchema, 'sucursales');


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


app.patch('/api/sucursales/:id', async (req, res) => {
  try {
    const db = cleinte.db('MarketOps');
    const { id } = req.params;
    const { working, failures, outOfService } = req.body;

    
    const filtro = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }] }
      : { _id: id };

    const resultado = await db.collection('Equipos').findOneAndUpdate(
      filtro,
      { $set: { working, failures, outOfService } },
      { returnDocument: 'after' }
    );

    if (!resultado) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }

    return res.json(resultado);
  } catch (error) {
    console.error('Error en PATCH:', error);
    return res.status(500).json({ error: error.message });
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







