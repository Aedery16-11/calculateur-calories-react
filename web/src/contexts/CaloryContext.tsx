import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import type { CaloryEntry } from "../models/CalorieEntry"
import { useAuth } from "./AuthContext"

type CaloryContextType = {
    calories: CaloryEntry[]
    addCalory: (calory: CaloryEntry) => void
    removeCalory: (id: string) => void
    filterDate: string;
    setFilterDate: (date: string) => void;
}

export const CaloriesContext = createContext<CaloryContextType>({
    calories: [],
    addCalory: () => { },
    removeCalory: () => { },
    filterDate: "",
    setFilterDate: () => { }
});

export const CaloriesProvider = ({ children }: PropsWithChildren) => {
    const [calories, setCalories] = useState<CaloryEntry[]>([])
    const [filterDate, setFilterDate] = useState<string>("")
    const { token } = useAuth();

    useEffect(() => {
        const storedCalories = async () => {
            if (!token) return;
            const url = filterDate 
                ? `http://localhost:3000/calories?dateAjout=${filterDate}`
                : "http://localhost:3000/calories";
            
            const reponse = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const object = await reponse.json();
            // Sécurité : s'assurer que c'est un tableau
            if (Array.isArray(object)) {
                setCalories(object);
            } else {
                setCalories([]);
            }
        }
        storedCalories()
    }, [token, filterDate])

    return <CaloriesContext.Provider value={{
        calories,
        filterDate,
        setFilterDate,
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
        removeCalory: (id: string) => {
            if (!token) return;
            setCalories((current) => current.filter((entry) => entry._id !== id));
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
