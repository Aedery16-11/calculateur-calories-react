import { useState, useEffect } from 'react'
import { useCalories } from '../contexts/CaloryContext'
import type { CaloryEntry } from '../models/CalorieEntry'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Template = {
  _id: string;
  label: string;
  qtyCalory: number;
  category: "sport" | "repas";
}

const CaloryForm = () => {
  const [label, setLabel] = useState("")
  const [qtyCalory, setQtyCalory] = useState(0)
  const [category, setCategory] = useState<"sport" | "repas">("repas")
  const [templates, setTemplates] = useState<Template[]>([])
  
  const { addCalory } = useCalories()
  const { token } = useAuth()
  const navigate = useNavigate();

  useEffect(() => { //récupères toutes les templates pour les afficher dans les listes déroulantes
    if (token) {
      fetch("http://localhost:3000/templates", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => console.error(err))
    }
  }, [token])

  //stocker dans des variables séparées les templates de repas et de sport pour les afficher dans deux listes déroulantes différentes
  const repasTemplates = templates.filter(t => t.category === "repas");
  const sportTemplates = templates.filter(t => t.category === "sport");

  const caloryEntry: CaloryEntry = {
    label,
    qtyCalory,
    category
  }

  const applyTemplate = (id: string) => { //appliquer les templates pour créer l'entrée
    const t = templates.find(item => item._id === id);
    if (t) { //si on trouve la template, on remplit le formulaire avec les données de la template dans le state
      setLabel(t.label);
      setQtyCalory(t.qtyCalory);
      setCategory(t.category);
    }
  }

  return (
    <div>
      
      {/* 1. Sélection des modèles séparée en deux listes */}
      <div>
        
        <div>
          <label>Modèles de Repas :</label>
          <select 
            className='select'
            value=""
            onChange={(e) => applyTemplate(e.target.value)}
          >
            <option className='option' value="" disabled>-- Choisir un repas --</option>
            {repasTemplates.map(t => (
              <option key={t._id} value={t._id}>{t.label} ({t.qtyCalory} kcal)</option>
            ))}
          </select>
        </div>

        <div>
          <label>Modèles de Sport :</label>
          <select 
            className='select'
            value=""
            onChange={(e) => applyTemplate(e.target.value)}
          >
            <option value="" disabled>-- Choisir un sport --</option>
            {sportTemplates.map(t => (
              <option key={t._id} value={t._id}>{t.label} ({t.qtyCalory} kcal)</option>
            ))}
          </select>
        </div>

      </div>

      <hr/>

      {/* 2. Formulaire d'édition/ajout */}
      <form onSubmit={(e) => {
        e.preventDefault()
        addCalory(caloryEntry)
        navigate("/")
      }} className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        
        <h2 className="text-xl font-bold text-center mb-2">Détails de l'entrée</h2>

        <div className="flex flex-col gap-1">
          <label className='label'>Libellé</label>
          <input
            type="text"
            placeholder="Ex: Poulet grillé, Natation..."
            className='input'
            value={label}
            onChange={(e) => setLabel(e.target.value)} 
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className='label'>Calories (kcal)</label>
          <input
            type="number"
            placeholder="Valeur énergétique"
            className='input'
            value={qtyCalory}
            onChange={(e) => setQtyCalory(parseInt(e.target.value) || 0)} 
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className='label'>Catégorie</label>
          <select 
            value={category} 
            className='select' 
            onChange={(e) => setCategory(e.target.value as "sport" | "repas")}
          >
            <option value="repas">Repas / Encas</option>
            <option value="sport">Activité Sportive</option>
          </select>
        </div>

        <button type='submit' className='bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md mt-4'>
          Enregistrer l'activité
        </button>
      </form>
    </div>
  )
}

export default CaloryForm
