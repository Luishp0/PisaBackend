import CatalogoParo from '../models/catalogoParosModel.js';

// Obtener todos los registros de catálogo de paros
export const getCatalogosParos = async (req, res) => {
  try {
    const catalogosParos = await CatalogoParo.find().sort({ nivel: 1, categoria: 1 });
    res.status(200).json(catalogosParos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener registros filtrados por nivel
export const getCatalogosPorNivel = async (req, res) => {
  try {
    const { nivel } = req.params;
    const nivelNum = parseInt(nivel);
    
    if (isNaN(nivelNum) || nivelNum < 1 || nivelNum > 4) {
      return res.status(400).json({ message: 'El nivel debe ser un número entre 1 y 4' });
    }
    
    const catalogos = await CatalogoParo.find({ nivel: nivelNum }).sort({ categoria: 1 });
    res.status(200).json(catalogos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un registro específico por ID
export const getCatalogoParo = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogoParo = await CatalogoParo.findById(id);
    
    if (!catalogoParo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    
    res.status(200).json(catalogoParo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro
export const createCatalogoParo = async (req, res) => {
  try {
    const { categoria, nivel } = req.body;
    
    // Verificar campos requeridos
    if (!categoria || !nivel) {
      return res.status(400).json({ message: 'Se requiere categoría y nivel' });
    }
    
    // Verificar que el nivel sea válido
    if (nivel < 1 || nivel > 4 || !Number.isInteger(parseInt(nivel))) {
      return res.status(400).json({ message: 'El nivel debe ser un número entero entre 1 y 4' });
    }
    
    // Verificar si ya existe un registro con la misma categoría y nivel
    const existingCategoria = await CatalogoParo.findOne({ 
      categoria, 
      nivel: parseInt(nivel) 
    });
    
    if (existingCategoria) {
      return res.status(400).json({ 
        message: `Ya existe un registro con la categoría "${categoria}" en el nivel ${nivel}` 
      });
    }
    
    const newCatalogoParo = new CatalogoParo({
      categoria,
      nivel: parseInt(nivel)
    });
    
    const savedCatalogoParo = await newCatalogoParo.save();
    res.status(201).json(savedCatalogoParo);
  } catch (error) {
    // Manejar error de duplicado MongoDB (por si acaso)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'No se puede crear un duplicado de categoría y nivel' 
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un registro existente
export const updateCatalogoParo = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria, nivel } = req.body;
    
    const updateData = {};
    
    if (categoria) {
      updateData.categoria = categoria;
    }
    
    if (nivel) {
      // Verificar que el nivel sea válido
      if (nivel < 1 || nivel > 4 || !Number.isInteger(parseInt(nivel))) {
        return res.status(400).json({ message: 'El nivel debe ser un número entero entre 1 y 4' });
      }
      updateData.nivel = parseInt(nivel);
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
    }
    
    // Obtener el registro actual para usar en la verificación
    const currentRecord = await CatalogoParo.findById(id);
    if (!currentRecord) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    
    // Verificar si estamos creando un duplicado
    if (updateData.categoria || updateData.nivel) {
      const searchQuery = {
        _id: { $ne: id }, // No incluir el registro actual
        categoria: updateData.categoria || currentRecord.categoria,
        nivel: updateData.nivel || currentRecord.nivel
      };
      
      const existingRecord = await CatalogoParo.findOne(searchQuery);
      
      if (existingRecord) {
        return res.status(400).json({ 
          message: `Ya existe un registro con la categoría "${searchQuery.categoria}" en el nivel ${searchQuery.nivel}` 
        });
      }
    }
    
    const updatedCatalogoParo = await CatalogoParo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedCatalogoParo);
  } catch (error) {
    // Manejar error de duplicado MongoDB (por si acaso)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'No se puede actualizar a un duplicado de categoría y nivel' 
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un registro
export const deleteCatalogoParo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedCatalogoParo = await CatalogoParo.findByIdAndDelete(id);
    
    if (!deletedCatalogoParo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    
    res.status(200).json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Inicializar las categorías del nivel 1 mostradas en la imagen
export const initializeNivel1Categorias = async (req, res) => {
  try {
    const categoriasNivel1 = [
      { categoria: "ADMINISTRATIVO", nivel: 1 },
      { categoria: "CAMBIOS Y LIMPIEZAS", nivel: 1 },
      { categoria: "COMEDOR", nivel: 1 },
      { categoria: "INEFICIENCIA", nivel: 1 },
      { categoria: "PROYECTOS (PAROS MAYORES)", nivel: 1 },
      { categoria: "SERVICIOS", nivel: 1 },
      { categoria: "SIN TURNO", nivel: 1 }
    ];
    
    // Verificar si ya existen registros para nivel 1
    const existingCount = await CatalogoParo.countDocuments({ nivel: 1 });
    
    if (existingCount > 0) {
      return res.status(400).json({ 
        message: 'Ya existen categorías para el nivel 1. No se puede inicializar.' 
      });
    }
    
    // Insertar todas las categorías del nivel 1
    const result = await CatalogoParo.insertMany(categoriasNivel1);
    
    res.status(201).json({
      message: 'Categorías del nivel 1 inicializadas correctamente',
      categorias: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};