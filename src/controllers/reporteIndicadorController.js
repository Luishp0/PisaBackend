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
export const getReporteIndicadores = async (req, res) => {
  try {
    // Extraer filtros de la solicitud (IDs de los catálogos seleccionados)
    const { centro, departamento, linea, proceso, fechaDesde, fechaHasta } = req.query;
    
    // Construir la pipeline de agregación
    const pipeline = [];
    
    // Etapa 1: Filtrar por fecha si se proporcionan rangos
    if (fechaDesde || fechaHasta) {
      const matchFecha = { fechaHora: {} };
      
      if (fechaDesde) {
        matchFecha.fechaHora.$gte = new Date(fechaDesde);
      }
      
      if (fechaHasta) {
        // Ajustar la fecha hasta para incluir todo el día
        const hasta = new Date(fechaHasta);
        hasta.setHours(23, 59, 59, 999);
        matchFecha.fechaHora.$lte = hasta;
      }
      
      pipeline.push({ $match: matchFecha });
    }
    
    // Etapa 2: Hacer lookup para unir datos de diferentes colecciones
    pipeline.push(
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
      { $unwind: { path: '$centro', preserveNullAndEmptyArrays: true } }
    );
    
    // Etapa 3: Filtrar por centro, departamento, línea y proceso si se proporcionan
    if (centro || departamento || linea || proceso) {
      const matchFiltros = {};
      
      if (centro) {
        matchFiltros['centro.centroId'] = centro;
      }
      
      if (departamento) {
        matchFiltros['proceso.departamentoId'] = departamento;
      }
      
      if (linea) {
        matchFiltros['proceso.lineaId'] = linea;
      }
      
      if (proceso) {
        matchFiltros['proceso.procesoId'] = proceso;
      }
      
      pipeline.push({ $match: matchFiltros });
    }
    
    // Etapa 4: Unir con rechazos y paros para calcular totales
    pipeline.push(
      // Unir con rechazos
      {
        $lookup: {
          from: 'rechazos',
          localField: '_id',
          foreignField: 'produccion',
          as: 'rechazos'
        }
      },
      
      // Unir con paros
      {
        $lookup: {
          from: 'paros',
          localField: '_id',
          foreignField: 'produccion',
          as: 'paros'
        }
      }
    );
    
    
// Etapa 5: Proyectar los datos en el formato deseado con todos los campos necesarios
pipeline.push({
  $project: {
    _id: 1,
    id: '$_id',
    // Campos de material
    material: '$material.nombreMaterial',
    descripcionMaterial: '$material.descripcionMaterial',
    velocidadNominal: '$material.velocidadNominal',
    orden: '$material.orden',
    lote: '$material.lote',
    // Campos de producción
    piezas: '$piezasProduccidas',
    
    // Usar timezone en lugar de añadir horas manualmente
    fecha: { 
      $dateToString: { 
        format: '%Y-%m-%d', 
        date: '$fechaHora', 
        timezone: 'America/Mexico_City'  // Especificar la zona horaria
      } 
    },
    hora: { 
      $dateToString: { 
        format: '%H:%M', 
        date: '$fechaHora',
        timezone: 'America/Mexico_City'  // Especificar la zona horaria
      } 
    },
    
    ciclo: '$ciclo',
    // Campos calculados
    paros: { $size: '$paros' },
    paroDuracion: { $sum: '$paros.duracion' },
    rechazos: { $sum: '$rechazos.cantidad' },
    // Campos relacionados
    turno: '$turno.nombreTurno',
    proceso: '$proceso.nombreProceso',
    centro: '$centro.nombreCentro',
    // Campos adicionales para debugging
    materialCompleto: '$material'
  }
});
    
    // Etapa 6: Ordenar los resultados por fecha y hora
    pipeline.push({
      $sort: {
        fecha: -1,
        hora: -1
      }
    });
    
    // Ejecutar la agregación
    const resultados = await Produccion.aggregate(pipeline);
    
    // Si no hay resultados, intentar un enfoque alternativo
    if (resultados.length === 0) {
      // Intentar obtener datos directamente para diagnosticar
      const produccion = await Produccion.find().limit(5).lean();
      const materiales = await Material.find().limit(5).lean();
      
      return res.status(200).json({
        message: 'No se encontraron resultados con los filtros proporcionados',
        debug: {
          filtros: { centro, departamento, linea, proceso, fechaDesde, fechaHasta },
          muestraProduccion: produccion,
          muestraMateriales: materiales
        }
      });
    }
    
    // Responder con los resultados
    res.status(200).json(resultados);
  } catch (error) {
    console.error('Error en el controlador de reporte de indicadores:', error);
    res.status(500).json({ 
      error: 'Error al procesar la solicitud', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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