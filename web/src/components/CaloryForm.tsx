import { useState } from 'react'
import { useCalories } from '../contexts/CaloryContext'
import type { CaloryEntry } from '../models/CalorieEntry'
import { useNavigate } from 'react-router-dom'
const CaloryForm = () => {
  const [label, setLabel] = useState("")
  const [qtyCalory, setQtyCalory] = useState(0)
  const [category, setCategory] = useState<"sport" | "repas">("repas")
  const { addCalory } = useCalories()
  const navigate = useNavigate();
  const CATEGORIES_LIST = [
    { label: "Repas / Encas", value: "repas" },
    { label: "Activité Sportive", value: "sport" }
  ];
  const caloryEntry: CaloryEntry = {
    label,
    qtyCalory,
    category
  }
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        addCalory(caloryEntry)
        navigate("/")
      }}>
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
            setQtyCalory(parseInt(e.target.value) || 0)
          )} />

        <select name="category" id="category" value={category} className='select' onChange={(e) => { setCategory(e.target.value as "sport" | "repas") }}>
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
        <br />
        <button type='submit' className='button'>Soumettre</button>
      </form>
    </>
  )
}

export default CaloryForm