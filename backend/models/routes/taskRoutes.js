// backend/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

// Middleware para verificar token
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ erro: "Token ausente" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ erro: "Token inválido" });
  }
}

// Criar tarefa
router.post("/", auth, async (req, res) => {
  const { texto } = req.body;
  const nova = new Task({ texto, concluida: false, userId: req.userId });
  await nova.save();
  res.json(nova);
});

// Listar tarefas
router.get("/", auth, async (req, res) => {
  const tarefas = await Task.find({ userId: req.userId });
  res.json(tarefas);
});

// Atualizar tarefa
router.put("/:id", auth, async (req, res) => {
  const tarefa = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tarefa);
});

// Deletar tarefa
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Tarefa deletada" });
});

module.exports = router;
