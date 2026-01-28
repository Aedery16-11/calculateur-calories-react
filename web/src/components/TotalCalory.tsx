import React from 'react'
import type { CaloryEntry } from '../models/CalorieEntry'

const entries: CaloryEntry[] = [
    { label: "Pomme", category: "repas", qtyCalory: 50 },
    { label: "Jogging", category: "sport", qtyCalory: -200 }
]

const TotalCalory = () => {
  return (
    <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
        <table className="table">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Categorie</th>
                    <th>Calories</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.label}</td>
                        <td>{entry.category}</td>
                        <td>{entry.qtyCalory}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TotalCalory