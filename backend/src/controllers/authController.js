const db = require("../config/db");
const bcrypt = require("bcryptjs");

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      // Busca primeiro em alunos (onde está o Diretor)
      let result = await db.query("SELECT * FROM alunos WHERE email = $1", [
        email,
      ]);
      let user = result.rows[0];

      if (!user) {
        // Se não achar, busca em professores
        result = await db.query("SELECT * FROM professores WHERE email = $1", [
          email,
        ]);
        user = result.rows[0];
      }

      if (user && (await bcrypt.compare(senha, user.senha))) {
        return res.json({ id: user.id, nome: user.nome, perfil: user.perfil });
      }
      res.status(401).json({ error: "Credenciais inválidas" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = AuthController;
