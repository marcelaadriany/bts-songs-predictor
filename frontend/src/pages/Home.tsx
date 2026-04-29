import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>

      <button onClick={() => navigate("/login")}>Ir para Login</button>

      <button onClick={() => navigate("/bet")}>Fazer aposta</button>

      <button onClick={() => navigate("/results")}>Ver resultados</button>
    </div>
  );
}
