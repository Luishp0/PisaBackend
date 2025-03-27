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
import etapaRoutes from './routes/etapaRouter.js'
import departamentoRouter from "./routes/departamentoRouter.js";
import grupoRouter from "./routes/grupoRouter.js";
import turnoRouter from "./routes/turnoRouter.js";
import lineaRouter from "./routes/lineaRouter.js";
import materialRouter from "./routes/materialRouter.js";
import rechazoRouter from "./routes/rechazoRouter.js";
import paroRouter from "./routes/paroRouter.js";
//catalogo
import catalogoTurnoRoutes from './routes/catalogoTurnoRoute.js';
import catalogoProcesoRoutes from './routes/catalogoProcesoRoute.js';
import catalogoLineaRoutes from './routes/catalogoLineaRoute.js';
import catalogoGrupoRoutes from './routes/catalogoGrupoRoute.js';
import catalogoEtapaRoutes from './routes/catalogoEtapaRoute.js';
import catalogoDepartamentoRoutes from './routes/catalogoDepartamentoRoute.js';
import catalogoCentroRoutes from './routes/catalogoCentroRoute.js';
import catalogoMaterialRoutes from './routes/catalogoMaterialRoute.js'
import catalogoRechazoRoutes from './routes/catalogoRechazoRoute.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/usuario', userRoutes);
app.use('/roles', roleRoutes);
app.use('/auth', authRoutes);

app.use('/produccion', produccionRoutes);

app.use("/materiales", materialRouter);
app.use('/centro', centroRoutes);
app.use('/proceso', procesoRoutes);
app.use('/etapa', etapaRoutes);
app.use('/departamento', departamentoRouter);
app.use('/grupo', grupoRouter);
app.use('/turno', turnoRouter);
app.use("/linea", lineaRouter);

app.use("/rechazo", rechazoRouter);
app.use("/paros", paroRouter);
//catalogo
app.use('/catalogoTurno', catalogoTurnoRoutes);
app.use('/catalogoProceso', catalogoProcesoRoutes);
app.use('/catalogoLinea', catalogoLineaRoutes);
app.use('/catalogoGrupo', catalogoGrupoRoutes);
app.use('/catalogoEtapa', catalogoEtapaRoutes);
app.use('/catalogoDepartamento', catalogoDepartamentoRoutes);
app.use('/catalogoCentro', catalogoCentroRoutes);
app.use('/catalogoMaterial', catalogoMaterialRoutes);
app.use('/catalogoRechazo', catalogoRechazoRoutes);

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
