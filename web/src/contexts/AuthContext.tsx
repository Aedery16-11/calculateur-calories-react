import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";


export type AuthContextType = {
  token?: string;
  role?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => false,
  logout: () => { },
  signup: () => { },
});

const getRoleFromToken = (token: string | undefined) => {
  if (!token) return "user"; //si pas de token on considère que c'est un utilisateur standard
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));  //on parse le payload du token pour récupérer le rôle de l'utilisateur
    return payload.role || "user"; //si pas de rôle dans le token on considère que c'est un utilisateur standard
  } catch {
    return "user"; 
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem("token") || undefined);
  //le token est soit de type string parce qu'il peut provenir du localstorage soit undefined si on a pas de token (le setItem est dans AuthContext fonction login)
  const role = getRoleFromToken(token);
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }

      const json = await response.json();

      localStorage.setItem("token", json.token);
      setToken(json.token);

    } catch (error) {
      console.error(error);
      alert("Erreur d'identifiants");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
  };
  const signup = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }

      const json = await response.json();

      localStorage.setItem("token", json.token);
      setToken(json.token);

    } catch (error) {
      console.error(error);
      alert("Erreur d'identifiants");
    }
  }
  return (
    <AuthContext.Provider value={{ token, role, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
