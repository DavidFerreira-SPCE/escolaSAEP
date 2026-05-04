const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const alunoRoutes = require("./routes/aluno.routes");
const professorRoutes = require("./routes/professor.routes");
const adminRoutes = require("./routes/admin.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/aluno", alunoRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
