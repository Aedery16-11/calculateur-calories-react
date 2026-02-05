import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";


export type AuthContextType = {
  token?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => false,
  logout: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem("token") || undefined);
  //le token est soit de type string parce qu'il peut provenir du localstorage soit undefined si on a pas de token (le setItem est dans AuthContext fonction login)
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

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
