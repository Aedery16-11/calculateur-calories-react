import { ObjectId } from "mongodb";
import Joi from "joi";

// On définit la forme de nos données (Interface)
export interface CaloryEntry {
  _id?: ObjectId;      // L'ID est optionnel à la création (MongoDB le crée)
  label: string;       // Ex: "Pizza"
  qtyCalory: number;    // Ex: 500
  category: "sport" | "repas", // Soit un apport, soit une dépense
  dateAjout: Date,
  userId: string, // ID de l'utilisateur qui a créé l'entrée
}

// Le schéma Joi ne valide que ce que le client envoie
export const caloryEntrySchema = Joi.object({
  label: Joi.string().required(),
  qtyCalory: Joi.number().required(),
  category: Joi.string().valid("sport", "repas").required(),
  //on ne vérifie pas la date car elle est générée par mongo db
});