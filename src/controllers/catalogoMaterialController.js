import CatalogoMaterial from '../models/catalogoMaterialModel.js';

// Obtener todos los materiales
export const getAllMateriales = async (req, res) => {
  try {
    const materiales = await CatalogoMaterial.find();
    res.status(200).json(materiales);
  } catch (error) {
    console.error('Error al obtener materiales:', error);
    res.status(500).json({ message: 'Error al obtener materiales', error: error.message });
  }
};

// Obtener un material por ID
export const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const material = await CatalogoMaterial.findById(id);
    
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    
    res.status(200).json(material);
  } catch (error) {
    console.error('Error al obtener material por ID:', error);
    res.status(500).json({ message: 'Error al obtener material', error: error.message });
  }
};

// Crear un nuevo material
export const createMaterial = async (req, res) => {
  try {
    const { nombreMaterialCatalogo, descripcionMaterial } = req.body;
    
    // Validar que se proporcionen los campos requeridos
    if (!nombreMaterialCatalogo || !descripcionMaterial) {
      return res.status(400).json({ 
        message: 'Se requieren los campos nombreMaterialCatalogo y descripcionMaterial' 
      });
    }
    
    // Verificar si ya existe un material con el mismo nombre
    const materialExistente = await CatalogoMaterial.findOne({ nombreMaterialCatalogo });
    if (materialExistente) {
      return res.status(400).json({ message: 'Ya existe un material con ese nombre' });
    }
    
    // Crear el nuevo material
    const nuevoMaterial = new CatalogoMaterial({
      nombreMaterialCatalogo,
      descripcionMaterial
    });
    
    // Guardar en la base de datos
    const materialGuardado = await nuevoMaterial.save();
    
    res.status(201).json(materialGuardado);
  } catch (error) {
    console.error('Error al crear material:', error);
    res.status(500).json({ message: 'Error al crear material', error: error.message });
  }
};

// Actualizar un material existente
export const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreMaterialCatalogo, descripcionMaterial } = req.body;
    
    // Validar que se proporcionen los campos requeridos
    if (!nombreMaterialCatalogo || !descripcionMaterial) {
      return res.status(400).json({ 
        message: 'Se requieren los campos nombreMaterialCatalogo y descripcionMaterial' 
      });
    }
    
    // Verificar si el material existe
    const materialExistente = await CatalogoMaterial.findById(id);
    if (!materialExistente) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    
    // Verificar si ya existe otro material con el mismo nombre (excepto el actual)
    const materialConMismoNombre = await CatalogoMaterial.findOne({
      nombreMaterialCatalogo,
      _id: { $ne: id }
    });
    
    if (materialConMismoNombre) {
      return res.status(400).json({ message: 'Ya existe otro material con ese nombre' });
    }
    
    // Actualizar el material
    const materialActualizado = await CatalogoMaterial.findByIdAndUpdate(
      id,
      { nombreMaterialCatalogo, descripcionMaterial },
      { new: true }
    );
    
    res.status(200).json(materialActualizado);
  } catch (error) {
    console.error('Error al actualizar material:', error);
    res.status(500).json({ message: 'Error al actualizar material', error: error.message });
  }
};

// Eliminar un material
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si el material existe
    const materialExistente = await CatalogoMaterial.findById(id);
    if (!materialExistente) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    
    // Eliminar el material
    await CatalogoMaterial.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Material eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar material:', error);
    res.status(500).json({ message: 'Error al eliminar material', error: error.message });
  }
};