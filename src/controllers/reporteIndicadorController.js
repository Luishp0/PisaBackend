// controllers/reporteIndicadoresController.js
import mongoose from 'mongoose';
import Produccion from '../models/produccionModel.js';
import Material from '../models/materialModel.js';
import Turno from '../models/turnoModel.js';
import Rechazo from '../models/rechazoModel.js';
import Paro from '../models/paroModel.js';
import Proceso from '../models/procesoModel.js';
import Centro from '../models/centroModel.js';

/**
 * Obtener reporte de indicadores con filtros aplicados
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
// Reemplaza toda tu lógica de agregación con:
export const getReporteIndicadores = async (req, res) => {
  try {
    // Obtener producciones
    const producciones = await Produccion.find().lean();
    
    // Obtener todos los materiales
    const materiales = await Material.find().lean();
    
    // Obtener todos los turnos
    const turnos = await Turno.find().lean();
    
    // Obtener todos los rechazos
    const rechazos = await Rechazo.find().lean();
    
    // Obtener todos los paros
    const paros = await Paro.find().lean();
    
    // Obtener todos los procesos
    const procesos = await Proceso.find().lean();
    
    // Crear un mapa de materiales por produccion
    const materialesPorProduccion = {};
    materiales.forEach(material => {
      if (material.produccion) {
        const produccionId = material.produccion.toString();
        materialesPorProduccion[produccionId] = material;
      }
    });
    
    // Crear mapa de turnos por producción
    const turnosPorProduccion = {};
    turnos.forEach(turno => {
      if (turno.produccion) {
        const produccionId = turno.produccion.toString();
        turnosPorProduccion[produccionId] = turno;
      }
    });
    
    // Crear mapa de procesos por producción
    const procesosPorProduccion = {};
    procesos.forEach(proceso => {
      if (proceso.produccion) {
        const produccionId = proceso.produccion.toString();
        procesosPorProduccion[produccionId] = proceso;
      }
    });
    
    // Agrupar rechazos por producción y calcular totales
    const rechazosTotalesPorProduccion = {};
    rechazos.forEach(rechazo => {
      if (rechazo.produccion) {
        const produccionId = rechazo.produccion.toString();
        if (!rechazosTotalesPorProduccion[produccionId]) {
          rechazosTotalesPorProduccion[produccionId] = 0;
        }
        rechazosTotalesPorProduccion[produccionId] += rechazo.cantidad;
      }
    });
    
    // Agrupar paros por producción y calcular tiempo total
    const tiempoParoTotalPorProduccion = {};
    paros.forEach(paro => {
      if (paro.produccion) {
        const produccionId = paro.produccion.toString();
        if (!tiempoParoTotalPorProduccion[produccionId]) {
          tiempoParoTotalPorProduccion[produccionId] = 0;
        }
        tiempoParoTotalPorProduccion[produccionId] += paro.duracion;
      }
    });
    
    // Enriquecer las producciones con sus materiales, turnos, rechazos y paros
    const resultados = producciones.map(produccion => {
      const produccionId = produccion._id.toString();
      const material = materialesPorProduccion[produccionId] || {};
      const turno = turnosPorProduccion[produccionId] || {};
      const proceso = procesosPorProduccion[produccionId] || {};
      
      return {
        _id: produccion._id,
        id: produccion._id,
        
        // Campos de material
        material: material.nombreMaterial || null,
        velocidadNominal: material.velocidadNominal || null,
        orden: material.orden || null,
        lote: material.lote || null,
        
        // Campo de proceso (ahora desde la tabla Proceso)
        proceso: proceso.nombreProceso || 'No especificado',
        
        // Campo de turno
        turno: turno.nombreTurno || 'No especificado',
        
        // Campo de rechazos (solo el total)
        rechazos: rechazosTotalesPorProduccion[produccionId] || 0,
        
        // Campo de tiempo de paro (solo el total)
        tiempoParo: tiempoParoTotalPorProduccion[produccionId] || 0,
        
        // Campos de producción
        piezas: produccion.piezasProduccidas,
        
        // Formatear fecha y hora para zona horaria local
        fecha: new Date(produccion.fechaHora).toLocaleDateString('es-MX', {
          timeZone: 'America/Mexico_City',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        hora: new Date(produccion.fechaHora).toLocaleTimeString('es-MX', {
          timeZone: 'America/Mexico_City',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        ciclo: produccion.ciclo,
      };
    });
    
    // Filtrar solo los resultados que tienen material
    const resultadosConMaterial = resultados.filter(r => r.material !== null);
    
    if (resultadosConMaterial.length === 0) {
      return res.status(200).json({
        message: 'No se encontraron resultados con materiales asociados',
        debug: {
          totalProducciones: producciones.length,
          totalMateriales: materiales.length
        }
      });
    }
    
    // Ordenar por fecha y hora
    resultadosConMaterial.sort((a, b) => {
      if (a.fecha !== b.fecha) return b.fecha.localeCompare(a.fecha);
      return b.hora.localeCompare(a.hora);
    });
    
    res.status(200).json(resultadosConMaterial);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud',
      message: error.message
    });
  }
};
/**
 * Obtener reporte de indicador específico por ID
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
export const getReporteIndicadorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de reporte inválido' });
    }
    
    const pipeline = [
      // Filtrar por ID
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      
      // Unir con materiales
      {
        $lookup: {
          from: 'materiales',
          localField: '_id',
          foreignField: 'produccion',
          as: 'material'
        }
      },
      { $unwind: { path: '$material', preserveNullAndEmptyArrays: true } },
      
      // Unir con turnos
      {
        $lookup: {
          from: 'turnos',
          localField: '_id',
          foreignField: 'produccion',
          as: 'turno'
        }
      },
      { $unwind: { path: '$turno', preserveNullAndEmptyArrays: true } },
      
      // Unir con procesos
      {
        $lookup: {
          from: 'procesos',
          localField: '_id',
          foreignField: 'produccion',
          as: 'proceso'
        }
      },
      { $unwind: { path: '$proceso', preserveNullAndEmptyArrays: true } },
      
      // Unir con centros
      {
        $lookup: {
          from: 'centros',
          localField: '_id',
          foreignField: 'produccion',
          as: 'centro'
        }
      },
      { $unwind: { path: '$centro', preserveNullAndEmptyArrays: true } },
      
      // Unir con rechazos y paros
      {
        $lookup: {
          from: 'rechazos',
          localField: '_id',
          foreignField: 'produccion',
          as: 'rechazos'
        }
      },
      {
        $lookup: {
          from: 'paros',
          localField: '_id',
          foreignField: 'produccion',
          as: 'paros'
        }
      },
      
      // Proyectar datos formateados
      {
        $project: {
          _id: 1,
          id: '$_id',
          material: '$material.nombreMaterial',
          descripcionMaterial: '$material.descripcionMaterial',
          velocidadNominal: '$material.velocidadNominal',
          orden: '$material.orden',
          lote: '$material.lote',
          piezas: '$piezasProduccidas',
          fecha: { $dateToString: { format: '%Y-%m-%d', date: '$fechaHora' } },
          hora: { $dateToString: { format: '%H:%M', date: '$fechaHora' } },
          ciclo: '$ciclo',
          paros: { $size: '$paros' },
          paroDuracion: { $sum: '$paros.duracion' },
          rechazos: { $sum: '$rechazos.cantidad' },
          turno: '$turno.nombreTurno',
          proceso: '$proceso.nombreProceso',
          centro: '$centro.nombreCentro'
        }
      }
    ];
    
    const resultado = await Produccion.aggregate(pipeline);
    
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ error: 'Reporte de indicador no encontrado' });
    }
    
    res.status(200).json(resultado[0]);
  } catch (error) {
    console.error('Error al obtener reporte por ID:', error);
    res.status(500).json({ 
      error: 'Error al procesar la solicitud', 
      message: error.message 
    });
  }
};