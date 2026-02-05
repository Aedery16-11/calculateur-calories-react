import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { token, logout, role } = useAuth();

  return (
    <nav>
      <Link to="/">Accueil</Link> | <Link to="/add">Ajouter</Link> |{" "}

      {!token && ( //si pas de token, on affiche s'inscrire
        <>
          <Link to="/signup">S'inscrire</Link> |{" "}
        </>
      )}



      {token ? ( //si token, on affiche logout
        <>
          <span>User connecté</span> |{" "}
          <button onClick={logout} className="button">
            Logout
          </button>
          {role === "admin" && (
            <>
              <Link to="/admin">Admin</Link> |{" "}
            </>
          )}
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};