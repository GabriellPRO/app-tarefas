// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Cadastro
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();
    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao registrar" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    res.json({ token, nome: usuario.nome });
  } catch (err) {
    res.status(500).json({ erro: "Erro no login" });
  }
});

module.exports = router;