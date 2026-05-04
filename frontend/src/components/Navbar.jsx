import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">Escola SAEP - Aluno</div>
      <div className="menu-items">
        <span>Olá, {user?.nome}</span>
        <button onClick={() => navigate("/boletim")}>Ver Notas</button>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
}
