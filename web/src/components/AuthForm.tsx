import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom"
export const AuthForm = () => {
    const { token } = useAuth();
    if (token) {
    return <Navigate to="/" />;
  }
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link> | <Link to="/add">Ajouter</Link>
            </nav>

            <br />
            <h2>Signup</h2>

            <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await signup(email, password);
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
                    S'inscrire
                </button>
            </form>
            <br />
            <button className="button" onClick={() => navigate("/login")}>
                Déjà un compte ? Se connecter
            </button>
        </div>
    );
};