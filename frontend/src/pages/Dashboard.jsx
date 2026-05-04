import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [dados, setDados] = useState({ totalAlunos: 0, totalProfs: 0 });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await api.get("/admin/dashboard");
        setDados(response.data);
      } catch (err) {
        console.error("Erro ao buscar dashboard");
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="dash-container">
      <header>
        <h1>Bem-vindo, {user?.nome || "Usuário"}</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Sair
        </button>
      </header>

      <div className="cards">
        <div className="card">
          <h3>Total de Alunos</h3>
          <p>{dados.totalAlunos}</p>
        </div>
        <div className="card">
          <h3>Total de Professores</h3>
          <p>{dados.totalProfs}</p>
        </div>
      </div>
    </div>
  );
}
