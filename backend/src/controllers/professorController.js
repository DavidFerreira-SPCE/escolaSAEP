const db = require("../config/db");
const bcrypt = require("bcryptjs");

const ProfessorController = {
  // FUNÇÃO DE LISTAR PROFESSORES
  list: async (req, res) => {
    try {
      const result = await db.query(
        "SELECT p.id, p.nome, d.nome as materia FROM professores p JOIN disciplinas d ON p.id_disciplina = d.id",
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar professores" });
    }
  },

  // FUNÇÃO DE CRIAR PROFESSOR
  create: async (req, res) => {
    try {
      const { nome, email, senha, id_disciplina, turno_aula } = req.body;
      const hash = await bcrypt.hash(senha, 10);
      const result = await db.query(
        "INSERT INTO professores (nome, email, senha, id_disciplina, turno_aula) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome",
        [nome, email, hash, id_disciplina, turno_aula],
      );
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar professor" });
    }
  },

  // FUNÇÃO DE LANÇAR NOTA
  lancarNota: async (req, res) => {
    try {
      const { id_matricula, nota, faltas } = req.body;
      await db.query(
        "UPDATE matriculas SET nota = $1, faltas = $2 WHERE id = $3",
        [nota, faltas, id_matricula],
      );
      res.json({ message: "Nota e faltas atualizadas com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar nota" });
    }
  },
};

module.exports = ProfessorController;
