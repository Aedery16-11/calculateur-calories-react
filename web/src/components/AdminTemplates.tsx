import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const AdminTemplates = () => {
  const { token } = useAuth();
  const [label, setLabel] = useState("");
  const [qty, setQty] = useState(0);
  const [category, setCategory] = useState<"repas" | "sport">("repas");

  const handleSubmit = async (e: React.FormEvent) => { //permet d'ajouter une template
    e.preventDefault(); 
    await fetch("http://localhost:3000/templates", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ label, qtyCalory: qty, category })
    });
    alert("Template ajouté !");
    setLabel(""); setQty(0);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3> Ajouter un Template</h3>
      <input placeholder="Nom (ex: Pizza)" value={label} onChange={e => setLabel(e.target.value)} className="input" />
      <br />
      <input type="number" placeholder="Calories" value={qty} onChange={e => setQty(Number(e.target.value))} className="input" />
      <select value={category} onChange={e => setCategory(e.target.value as any)} className="input">
        <option value="repas">Repas (Apport)</option>
        <option value="sport">Sport (Dépense)</option>
      </select>
      <button type="submit">Enregistrer le Template</button>
    </form>
  );
};