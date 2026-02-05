import type { PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoginForm } from "./LoginForm";
import { AuthForm } from "./AuthForm";
export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <AuthForm />;
};
