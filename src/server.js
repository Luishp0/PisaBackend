import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { PORT } from './config/env.js';

// Importar rutas
import userRoutes from './routes/userRouter.js';
import roleRoutes from './routes/roleRouter.js';
import authRoutes from './routes/authRouter.js'
import produccionRoutes from './routes/produccionRouter.js'
import centroRoutes from './routes/centroRouter.js'
import procesoRoutes from './routes/procesoRouter.js'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', userRoutes);
app.use('/roles', roleRoutes);
app.use('/auth', authRoutes)
app.use('/produccion', produccionRoutes)
app.use('/centro', centroRoutes)
app.user('/proceso', procesoRoutes)




// Iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Conectado a MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
