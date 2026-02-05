import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { token, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Accueil</Link> | <Link to="/add">Ajouter</Link> |{" "}
      {token ? (
        <>
          <span>User connecté</span> |{" "}
          <button onClick={logout} className="text-blue-500 underline">
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};
