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
        const storedCalories = readCalories();
        setCalories(storedCalories);
    }, [])

    return <CaloriesContext.Provider value={{
        calories,
        addCalory: (calory: CaloryEntry) => {
            const newCalory = [...calories, calory]
            setCalories(newCalory)
            storeCalory(newCalory)
        },
        removeCalory: (index: number) => {
            const newCalories = calories.filter((calory, i) => i !== index);
            setCalories(newCalories);
            storeCalory(newCalories)
        }
    }}>
        {children}
    </CaloriesContext.Provider>
}

export const useCalories = () => {
    return useContext(CaloriesContext);
}

const storeCalory = (calories: CaloryEntry[]) => {
    localStorage.setItem('calories', JSON.stringify(calories));
}

const readCalories = (): CaloryEntry[] => {
    const value = localStorage.getItem('calories');
    if (value) {
        return JSON.parse(value) as CaloryEntry[];
    }
    return [];
}