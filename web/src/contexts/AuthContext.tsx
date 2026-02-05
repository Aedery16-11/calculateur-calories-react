import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";


export type AuthContextType = {
  token?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const [token, setToken] = useState<string>();

  
  const login = async (email: string, password: string) => {
   const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json()
    setToken(json.token)
  }


  return (
    <AuthContext.Provider
      value={{
        token,
        logout: () => {
          setToken(undefined);
        },
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
