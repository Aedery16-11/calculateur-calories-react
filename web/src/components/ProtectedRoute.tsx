import type { PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoginForm } from "./LoginForm";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <LoginForm />;
};
