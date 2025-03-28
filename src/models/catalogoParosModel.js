import mongoose from "mongoose";

// Esquema del catálogo de paros simplificado
const CatalogoParoSchema = new mongoose.Schema({
  categoria: { 
    type: String, 
    required: true,
    trim: true,
  },
  nivel: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 4,
    validate: {
      validator: Number.isInteger,
      message: 'El nivel debe ser un número entero'
    }
  }
}, {
  timestamps: true // Añade createdAt y updatedAt
});

// Crear un índice compuesto único en categoría + nivel
// Esto permitirá que la misma categoría exista en diferentes niveles
// y que diferentes categorías existan en el mismo nivel
// pero no permitirá duplicados exactos (misma categoría y mismo nivel)
CatalogoParoSchema.index({ categoria: 1, nivel: 1 }, { unique: true });

const CatalogoParo = mongoose.model('CatalogoParo', CatalogoParoSchema);

export default CatalogoParo;