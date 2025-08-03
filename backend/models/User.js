// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
});

module.exports = mongoose.model("User", userSchema);


// backend/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  texto: String,
  concluida: Boolean,
  userId: String,
});

module.exports = mongoose.model("Task", taskSchema);
