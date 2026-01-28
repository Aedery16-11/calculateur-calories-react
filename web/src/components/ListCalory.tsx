import React from 'react'
import type { CaloryEntry } from '../models/CalorieEntry'

const entries: CaloryEntry[] = [
    { label: "Pomme", category: "repas", qtyCalory: 50 },
    { label: "Jogging", category: "sport", qtyCalory: -200 }
]

const ListCalory = () => {
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
                {entries.map((entry, index) => ( /* pour avoir la key, on peut utiliser l'objet "id" de la classe si elle en possède, ici non donc on le crée avc .map() */
                    <tr key={index}> {/* IL FAUT ABSOLUMENT UNE KEY A CHAQUE FOIS */}
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

export default ListCalory