import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Boletim from "./pages/Boletim";
import Dashboard from "./pages/Dashboard";
import Professor from "./pages/Professor";
import Navbar from "./components/Navbar";

function App() {
  // Pegamos o usuário do localStorage para saber quem está logado
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        {/* Rota Exclusiva do Aluno */}
        <Route
          path="/boletim"
          element={user?.perfil === "aluno" ? <Boletim /> : <Navigate to="/" />}
        />

        {/* Rota Exclusiva do Professor */}
        <Route
          path="/professor"
          element={
            user?.perfil === "professor" ? <Professor /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
