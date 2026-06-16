const Estudiante = require("../models/Estudiante");

exports.crearEstudiante = async (req, res) => {
  try {
    const nuevo = await Estudiante.create(req.body);
    res.status(201).json({ mensaje: "Estudiante creado", data: nuevo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.crearVarios = async (req, res) => {
  try {
    const lista = await Estudiante.insertMany(req.body);
    res.status(201).json({ mensaje: "Estudiantes creados", total: lista.length, data: lista });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json({ total: estudiantes.length, data: estudiantes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante)
      return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json({ data: estudiante });
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
};

exports.actualizarEstudiante = async (req, res) => {
  try {
    const actualizado = await Estudiante.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado)
      return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json({ mensaje: "Estudiante actualizado", data: actualizado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarEstudiante = async (req, res) => {
  try {
    const eliminado = await Estudiante.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json({ mensaje: "Estudiante eliminado", data: eliminado });
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
};