import React from 'react'
import type { CaloryEntry } from '../models/CalorieEntry'
import { useCalories } from '../contexts/CaloryContext'


/* const calories: CaloryEntry[] = [
    { label: "Pomme", category: "repas", qtyCalory: 50 },
    { label: "Jogging", category: "sport", qtyCalory: -200 }
] */


const TotalCalory = () => {
    const { calories } = useCalories()
    let absorbed = 0
    let lost = 0
    calories.map((entry) => {
        if (entry.category === "repas") {
            absorbed += entry.qtyCalory
        }
        else {
            lost += entry.qtyCalory
        }
    })
    return (
        <>
            <p>Vous avez consommé : {absorbed}</p>
            <p>Vous avez dépensé : {lost}</p>
            <p>Votre apport est donc de {absorbed + lost} calories.</p>
        </>
    )
}

export default TotalCalory