const db = require("../config/db");

const AdminController = {
  // Matricular um aluno numa matéria
  matricular: async (req, res) => {
    const { id_aluno, id_disciplina } = req.body;
    try {
      await db.query(
        "INSERT INTO matriculas (id_aluno, id_disciplina) VALUES ($1, $2)",
        [id_aluno, id_disciplina],
      );
      res.json({ message: "Aluno matriculado!" });
    } catch (err) {
      res.status(400).json({ error: "Aluno já matriculado nesta matéria" });
    }
  },
  // Listar todos os usuários para o Diretor ver
  dashboard: async (req, res) => {
    const alunos = await db.query("SELECT count(*) FROM alunos");
    const profs = await db.query("SELECT count(*) FROM professores");
    res.json({
      totalAlunos: alunos.rows[0].count,
      totalProfs: profs.rows[0].count,
    });
  },

  listarMatriculas: async (req, res) => {
    try {
      const query = `
        SELECT m.id, a.nome AS aluno, d.nome AS disciplina, m.nota, m.faltas 
        FROM matriculas m
        JOIN alunos a ON m.id_aluno = a.id
        JOIN disciplinas d ON m.id_disciplina = d.id
      `;
      const result = await db.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar matrículas" });
    }
  },
};
module.exports = AdminController;
