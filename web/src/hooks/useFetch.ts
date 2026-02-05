import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const useFetch = <T>(path: string) => {
  const [data, setData] = useState<T>();
  const { token } = useAuth();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, path]);

  return {
    data,
    isLoading,
    error
  };
};
