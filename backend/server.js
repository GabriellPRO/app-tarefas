// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv\config");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Conectar ao MongoDB e iniciar servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch(err => console.error(err));