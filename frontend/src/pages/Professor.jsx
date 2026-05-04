import { useState } from "react";
import api from "../services/api";
import "./Professor.css";

export default function Professor() {
  const [matriculaId, setMatriculaId] = useState("");
  const [nota, setNota] = useState("");
  const [faltas, setFaltas] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLancamento = async (e) => {
    e.preventDefault();
    try {
      await api.put("/professor/lancar-nota", {
        id_matricula: matriculaId,
        nota: parseFloat(nota),
        faltas: parseInt(faltas),
      });
      setMensagem("✅ Lançamento realizado com sucesso!");
      setMatriculaId("");
      setNota("");
      setFaltas("");
    } catch (err) {
      setMensagem("❌ Erro ao lançar. Verifique o ID da matrícula.");
    }
  };

  return (
    <div className="professor-container">
      <h2>Painel do Professor</h2>
      <form onSubmit={handleLancamento} className="lancamento-form">
        <input
          type="number"
          placeholder="ID da Matrícula"
          value={matriculaId}
          onChange={(e) => setMatriculaId(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Nota (ex: 8.5)"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade de Faltas"
          value={faltas}
          onChange={(e) => setFaltas(e.target.value)}
          required
        />
        <button type="submit">Lançar no Sistema</button>
      </form>
      {mensagem && <p className="status-msg">{mensagem}</p>}
    </div>
  );
}
