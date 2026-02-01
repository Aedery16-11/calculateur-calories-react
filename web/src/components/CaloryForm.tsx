import React, { useState } from 'react'
import { useCalories } from '../contexts/CaloryContext'
import type { CaloryEntry } from '../models/CalorieEntry'
const CaloryForm = () => {
  const [label, setLabel] = useState("")
  const [qtyCalory, setQtyCalory] = useState(0)
  const [category, setCategory] = useState<"sport" | "repas">("repas")
  const { calories } = useCalories()
  const CATEGORIES_LIST = [
  { label: "Repas / Encas", value: "repas" },
  { label: "Activité Sportive", value: "sport" }
];
  const caloryEntry: CaloryEntry =  {
    label,
    qtyCalory,
    category
  }
  return (
    <>
      <form onSubmit={(e) => (
        e.preventDefault()
        
      )}>
        <input
          type="text"
          name='label'
          id='label'
          className='input'
          value={label}
          onChange={(e) => (
            setLabel(e.target.value)
          )} />
        <input
          type="number"
          name='qtyCalory'
          id='qtyCalory'
          className='input'
          value={qtyCalory}
          onChange={(e) => (
            setQtyCalory(parseInt(e.target.value))
          )} />

        <select name="category" id="category" value={category} className='select' onChange={(e) => { setCategory(e.target.value) }}>
          {
            CATEGORIES_LIST.map((category, index) => (
              <option className='option'
                value={category.value}
                key={index}
                
              >
                {category.label}
              </option>
            ))

          }
        </select>
      </form>
    </>
  )
}

export default CaloryForm