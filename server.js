require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const estudianteRoutes = require("./routes/estudianteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.get("/", (req, res) => {
  res.json({ mensaje: "API del taller funcionando" });
});

app.use("/api/estudiantes", estudianteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});