import { ObjectId } from "mongodb";

// On définit la forme de nos données (Interface)
export interface CaloryEntry {
  _id?: ObjectId;      // L'ID est optionnel à la création (MongoDB le crée)
  label: string;       // Ex: "Pizza"
  qtyCalory: number;    // Ex: 500
  category: "sport" | "repas"; // Soit un apport, soit une dépense
}