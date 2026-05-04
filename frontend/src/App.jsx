import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Boletim from "./pages/Boletim";
import Dashboard from "./pages/Dashboard"; // Verifique se importou o Dash!
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela de Login sem Navbar */}
        <Route path="/" element={<Login />} />

        {/* Rotas Logadas com Navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/boletim"
          element={
            <>
              <Navbar />
              <Boletim />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
