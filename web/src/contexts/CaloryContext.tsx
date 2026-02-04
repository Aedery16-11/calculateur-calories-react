import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import type { CaloryEntry } from "../models/CalorieEntry"

type CaloryContextType = {
    calories: CaloryEntry[]
    addCalory: (calory: CaloryEntry) => void
    removeCalory: (index: number) => void
}

export const CaloriesContext = createContext<CaloryContextType>({
    calories: [],
    addCalory: () => { },
    removeCalory: () => { },
});

export const CaloriesProvider = ({ children }: PropsWithChildren) => {
    const [calories, setCalories] = useState<CaloryEntry[]>([])

    useEffect(() => {
        const storedCalories = async () => {
            const reponse = await fetch("http://localhost:3000/calories");
            const object = await reponse.json();
            setCalories(object);
        }
        storedCalories()
    }, [])

    return <CaloriesContext.Provider value={{
        calories,
        addCalory: (calory: CaloryEntry) => {
            // 1. On envoie la demande au serveur (fetch)
            fetch("http://localhost:3000/calories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(calory)
            })
                .then((response) => {
                    // 2. On attend la réponse du serveur
                    return response.json();
                })
                .then((savedCalory) => {
                    // 3. Le serveur a répondu ! On met à jour l'affichage avec la donnée confirmée
                    // (savedCalory contient maintenant l'_id créé par MongoDB)
                    setCalories((currentCalories) => [...currentCalories, savedCalory]);
                })
                .catch((error) => {
                    console.error("Erreur lors de l'ajout :", error);
                })
        }, 
        removeCalory: (index: number) => {
            const idToDelete = calories[index]._id
            console.log("ID à supprimer :", idToDelete);
            if (idToDelete) {
                    fetch(`http://localhost:3000/calories/${idToDelete}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                }
            const newCalories = calories.filter((calory, i) => i !== index);
            setCalories(newCalories);
        }
    }}>
        {children}
    </CaloriesContext.Provider>
}

export const useCalories = () => {
    return useContext(CaloriesContext);
}
