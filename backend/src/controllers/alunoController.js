const db = require("../config/db");
const bcrypt = require("bcryptjs");

const AlunoController = {
  // FUNÇÃO DE CRIAR ALUNO
  create: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      const hash = await bcrypt.hash(senha, 10);
      const result = await db.query(
        "INSERT INTO alunos (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome",
        [nome, email, hash],
      );
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar aluno" });
    }
  },

  // FUNÇÃO DE LISTAR ALUNOS (É essa que está dando o erro na rota!)
  list: async (req, res) => {
    try {
      const result = await db.query(
        "SELECT id, nome, email FROM alunos WHERE perfil = $1",
        ["Aluno"],
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar alunos" });
    }
  },

  // FUNÇÃO DO BOLETIM
  getBoletim: async (req, res) => {
    try {
      const { id } = req.params;
      const query = `
                SELECT d.nome as materia, m.nota, m.faltas, m.status_atual 
                FROM matriculas m 
                JOIN disciplinas d ON m.id_disciplina = d.id 
                WHERE m.id_aluno = $1`;
      const result = await db.query(query, [id]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar boletim" });
    }
  },
};

module.exports = AlunoController;
