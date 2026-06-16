const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/estudianteController");

router.post("/", ctrl.crearEstudiante);
router.post("/varios", ctrl.crearVarios);
router.get("/", ctrl.obtenerEstudiantes);
router.get("/:id", ctrl.obtenerEstudiante);
router.put("/:id", ctrl.actualizarEstudiante);
router.delete("/:id", ctrl.eliminarEstudiante);

module.exports = router;
