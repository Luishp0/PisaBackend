// controllers/reporteIndicadoresController.js
import mongoose from 'mongoose';
import Produccion from '../models/produccionModel.js';
import Material from '../models/materialModel.js';
import Turno from '../models/turnoModel.js';
import Rechazo from '../models/rechazoModel.js';
import Paro from '../models/paroModel.js';
import Proceso from '../models/procesoModel.js';
import Centro from '../models/centroModel.js';
import Departamento from '../models/departamentoModel.js';
import Linea from '../models/lineaModel.js';

export const getReporteIndicadores = async (req, res) => {
  try {
    // Extraer los parámetros de filtro que aparecen en la interfaz
    const { centro, departamento, linea, proceso, desde, hasta } = req.method === 'GET' ? req.query : req.body;
    
    
    // Crear objeto para almacenar filtros para la consulta inicial
    let produccionQuery = {};
    
    // Filtro de fecha
    if (desde || hasta) {
      produccionQuery.fechaHora = {};
      
      if (desde) {
        const fechaDesdeObj = new Date(desde);
        fechaDesdeObj.setHours(0, 0, 0, 0);
        produccionQuery.fechaHora.$gte = fechaDesdeObj;
      }
      
      if (hasta) {
        const fechaHastaObj = new Date(hasta);
        fechaHastaObj.setHours(23, 59, 59, 999);
        produccionQuery.fechaHora.$lte = fechaHastaObj;
      }
    }

    // Consultar producciones con filtro de fecha
    const producciones = await Produccion.find(produccionQuery).lean();
    
    if (producciones.length === 0) {
      return res.status(200).json([]);
    }
    
    // Obtener IDs de producción
    const produccionIds = producciones.map(p => p._id);
    
    // Consultar datos relacionados
    const materiales = await Material.find({ produccion: { $in: produccionIds } }).lean();
    const turnos = await Turno.find({ produccion: { $in: produccionIds } }).lean();
    const rechazos = await Rechazo.find({ produccion: { $in: produccionIds } }).lean();
    const paros = await Paro.find({ produccion: { $in: produccionIds } }).lean();
    
    // Filtrar por proceso
    let procesosFiltrados = [];
    let produccionesConProceso = [...produccionIds];
    
    if (proceso) {
      const procesos = await Proceso.find({
        nombreProceso: { $regex: proceso, $options: 'i' },
        produccion: { $in: produccionIds }
      }).lean();
      
      if (procesos.length === 0) {
        return res.status(200).json([]);
      }
      
      procesosFiltrados = procesos;
      produccionesConProceso = procesos.map(p => p.produccion.toString());
    } else {
      procesosFiltrados = await Proceso.find({ produccion: { $in: produccionIds } }).lean();
    }
    
    // Filtrar por centro
    let produccionesConCentro = [...produccionIds.map(id => id.toString())];
    
    if (centro) {
      const centros = await Centro.find({
        nombreCentro: { $regex: centro, $options: 'i' },
        produccion: { $in: produccionIds }
      }).lean();
      
      if (centros.length === 0) {
        return res.status(200).json([]);
      }
      
      produccionesConCentro = centros.map(c => c.produccion.toString());
    }
    
    // Filtrar por departamento
    let produccionesConDepartamento = [...produccionIds.map(id => id.toString())];
    
    if (departamento) {
      const departamentos = await Departamento.find({
        nombreDepartamento: { $regex: departamento, $options: 'i' },
        produccion: { $in: produccionIds }
      }).lean();
      
      if (departamentos.length === 0) {
        return res.status(200).json([]);
      }
      
      produccionesConDepartamento = departamentos.map(d => d.produccion.toString());
    }
    
    // Filtrar por línea
    let produccionesConLinea = [...produccionIds.map(id => id.toString())];
    
    if (linea) {
      const lineas = await Linea.find({
        nombreLinea: { $regex: linea, $options: 'i' },
        produccion: { $in: produccionIds }
      }).lean();
      
      if (lineas.length === 0) {
        return res.status(200).json([]);
      }
      
      produccionesConLinea = lineas.map(l => l.produccion.toString());
    }
    
    // Intersección de todos los filtros
    const produccionesFiltradas = produccionIds
      .map(id => id.toString())
      .filter(id => 
        produccionesConProceso.includes(id) && 
        produccionesConCentro.includes(id) && 
        produccionesConDepartamento.includes(id) && 
        produccionesConLinea.includes(id)
      );
    
    if (produccionesFiltradas.length === 0) {
      return res.status(200).json([]);
    }
    
    // Convertir a MapObject para acceso más eficiente
    const materialesPorProduccion = {};
    materiales.forEach(material => {
      if (material.produccion) {
        const produccionId = material.produccion.toString();
        materialesPorProduccion[produccionId] = material;
      }
    });
    
    const turnosPorProduccion = {};
    turnos.forEach(turno => {
      if (turno.produccion) {
        const produccionId = turno.produccion.toString();
        turnosPorProduccion[produccionId] = turno;
      }
    });
    
    const procesosPorProduccion = {};
    procesosFiltrados.forEach(proc => {
      if (proc.produccion) {
        const produccionId = proc.produccion.toString();
        procesosPorProduccion[produccionId] = proc;
      }
    });
    
    // Calcular totales de rechazos por producción
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
    
    // Calcular tiempo total de paros por producción
    const tiempoParoTotalPorProduccion = {};
    const cantidadParosPorProduccion = {};
    paros.forEach(paro => {
      if (paro.produccion) {
        const produccionId = paro.produccion.toString();
        
        if (!tiempoParoTotalPorProduccion[produccionId]) {
          tiempoParoTotalPorProduccion[produccionId] = 0;
          cantidadParosPorProduccion[produccionId] = 0;
        }
        
        tiempoParoTotalPorProduccion[produccionId] += paro.duracion;
        cantidadParosPorProduccion[produccionId] += 1;
      }
    });
    
    // Crear resultados finales
    const resultados = producciones
      .filter(p => produccionesFiltradas.includes(p._id.toString()))
      .map(produccion => {
        const produccionId = produccion._id.toString();
        const material = materialesPorProduccion[produccionId] || {};
        const turno = turnosPorProduccion[produccionId] || {};
        const proceso = procesosPorProduccion[produccionId] || {};
        
        // Formatear fecha y hora
        const fechaHora = new Date(produccion.fechaHora);
        
        return {
          _id: produccionId,
          id: produccionId,
          
          // Campos de material
          material: material.nombreMaterial || null,
          velocidadNominal: material.velocidadNominal || null,
          orden: material.orden || null,
          lote: material.lote || null,
          
          // Campo de proceso
          proceso: proceso.nombreProceso || 'No especificado',
          
          // Campo de turno
          turno: turno.nombreTurno || 'No especificado',
          
          // Campo de rechazos (total)
          rechazos: rechazosTotalesPorProduccion[produccionId] || 0,
          
          // Campo de tiempo de paro (total)
          tiempoParo: tiempoParoTotalPorProduccion[produccionId] || 0,
          
          // Campos de producción
          piezas: produccion.piezasProduccidas || 0,
          nominales: material.velocidadNominal || 0,
          
          // Fecha y hora formateadas
          fecha: fechaHora.toLocaleDateString('es-MX', {
            timeZone: 'America/Mexico_City',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          
          hora: fechaHora.toLocaleTimeString('es-MX', {
            timeZone: 'America/Mexico_City',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          
          ciclo: produccion.ciclo || 0,
          paros: cantidadParosPorProduccion[produccionId] || 0
        };
      });
    
    // Filtrar para incluir solo aquellos con material definido
    const resultadosConMaterial = resultados.filter(r => r.material !== null);
    
    // Ordenar por fecha y hora (más recientes primero)
    resultadosConMaterial.sort((a, b) => {
      if (a.fecha !== b.fecha) return b.fecha.localeCompare(a.fecha);
      return b.hora.localeCompare(a.hora);
    });
    
    res.status(200).json(resultadosConMaterial);
  } catch (error) {
    console.error('Error en getReporteIndicadores:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud',
      message: error.message
    });
  }
};

// Endpoint para filtrar producción (útil para Postman)
export const filtrarProduccion = async (req, res) => {
  try {
    return getReporteIndicadores(req, res);
  } catch (error) {
    console.error('Error en filtrarProduccion:', error);
    res.status(500).json({
      error: 'Error al filtrar producción',
      message: error.message
    });
  }
};