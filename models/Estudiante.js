const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    edad: {
      type: Number,
      min: [16, "La edad mínima es 16"],
    },
    carrera: {
      type: String,
      default: "Sin asignar",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Estudiante", estudianteSchema, "estudiantes");