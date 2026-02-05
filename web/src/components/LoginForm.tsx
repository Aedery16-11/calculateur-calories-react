import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom"
export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/add">Ajouter</Link>
      </nav>

      <br />
      <h2>Login</h2>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
          navigate("/")
        }}
      >
        <input
          className="input"
          name="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Se connecter
        </button>
      </form>

      <br />
      <button className="button" onClick={() => navigate("/signup")}>
        Pas de compte ? S'inscrire
      </button>
    </div>
  );
};