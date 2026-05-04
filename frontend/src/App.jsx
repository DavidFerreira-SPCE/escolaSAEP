import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Boletim from "./pages/Boletim";
import Dashboard from "./pages/Dashboard"; // Verifique se importou o Dash!
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
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
