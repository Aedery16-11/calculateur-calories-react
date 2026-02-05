import type { PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { token, role } = useAuth();

  if (!token || role !== "admin") { //si pas de token ou si le rôle n'est pas admin on redirige vers la page d'accueil
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};