const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT_FRONT || 3000;

// Servir archivos estáticos desde "public/"
app.use(express.static(path.join(__dirname, "public")));

// Redirección por defecto
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌐 Frontend disponible en http://localhost:${PORT}`);
});
