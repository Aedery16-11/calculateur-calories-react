import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import type { CaloryEntry } from "../models/CalorieEntry"
import { useAuth } from "./AuthContext"

type CaloryContextType = {
    calories: CaloryEntry[]
    addCalory: (calory: CaloryEntry) => void
    removeCalory: (id: string) => void // <--- Changement ici : string (ID) et plus index
}

export const CaloriesContext = createContext<CaloryContextType>({
    calories: [],
    addCalory: () => { },
    removeCalory: () => { },
});

export const CaloriesProvider = ({ children }: PropsWithChildren) => {
    const [calories, setCalories] = useState<CaloryEntry[]>([])
    const { token } = useAuth();

    useEffect(() => {
        const storedCalories = async () => {
            if (!token) return;
            const reponse = await fetch("http://localhost:3000/calories", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const object = await reponse.json();
            setCalories(object);
        }
        storedCalories()
    }, [token])

    return <CaloriesContext.Provider value={{
        calories,
        addCalory: (calory: CaloryEntry) => {
            if (!token) return;
            fetch("http://localhost:3000/calories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(calory)
            })
                .then((response) => response.json())
                .then((savedCalory) => {
                    setCalories((currentCalories) => [...currentCalories, savedCalory]);
                })
                .catch((error) => console.error("Erreur ajout:", error))
        },
        removeCalory: (id: string) => { // <--- On prend l'ID directement
            if (!token) return;

            // 1. On supprime visuellement tout de suite (plus réactif)
            setCalories((current) => current.filter((entry) => entry._id !== id));

            // 2. On envoie la requête au serveur
            fetch(`http://localhost:3000/calories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }).catch(e => console.error("Erreur suppression", e));
        }
    }}>
        {children}
    </CaloriesContext.Provider>
}

export const useCalories = () => {
    return useContext(CaloriesContext);
}