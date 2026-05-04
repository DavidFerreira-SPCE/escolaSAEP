import { useEffect, useState } from "react";
import api from "../services/api";
import "./Boletim.css";

export default function Boletim() {
  const [notas, setNotas] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchBoletim() {
      try {
        // Usamos o id que veio do seu login (ex: o ID 17 que você criou)
        const response = await api.get(`/aluno/notas/${user.id}`);
        setNotas(response.data);
      } catch (err) {
        console.error("Erro ao buscar notas");
      }
    }
    if (user?.id) fetchBoletim();
  }, [user.id]);

  return (
    <div className="boletim-container">
      <h2>Meu Boletim Escolar</h2>
      <table className="boletim-table">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Nota</th>
            <th>Faltas</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((n, index) => (
            <tr key={index}>
              <td>{n.materia}</td>
              <td>{n.nota}</td>
              <td>{n.faltas}</td>
              <td
                className={
                  n.status_atual === "Aprovado" ? "aprovado" : "reprovado"
                }
              >
                {n.status_atual}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
