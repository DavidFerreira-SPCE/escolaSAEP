import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, senha });
      const user = response.data;

      // 1. Salva no localStorage (garante que os dados estão lá)
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Usuário vindo do back:", user);

      // 2. Redirecionamento SEGURO (sem quebrar se o perfil for nulo)
      const perfil = user.perfil ? user.perfil.toLowerCase() : "";

      if (perfil === "Professor") {
        window.location.href = "/professor";
      } else if (perfil === "Aluno") {
        window.location.href = "/boletim";
      } else {
        // Se o perfil for "admin", vazio ou qualquer outra coisa
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setErro("E-mail ou senha inválidos");
    }
  };
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Escola SAEP</h2>
        {erro && <p className="error">{erro}</p>}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
