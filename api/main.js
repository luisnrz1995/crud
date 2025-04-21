const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const conectarBaseDeDatos = require("./config/db");
const userRoutes = require("./src/routes/userRoute");
const productRoutes = require("./src/routes/productRoute");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

conectarBaseDeDatos();

app.use(cors()); // ✅ Importante
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
