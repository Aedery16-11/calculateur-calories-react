import { Router } from "express";
import { db } from "../../db";
import { CaloryEntry } from "./caloriesModels";
import { ObjectId } from "mongodb";
export const caloryRoutes = Router();

// GET /calories : Lister (avec filtre optionnel sur category)
caloryRoutes.get("/", async (req, res) => {
  // On récupère le paramètre d'URL (ex: ?category=sport)
  // C'est standard en Express pour les filtres
  const categoryFilter = req.query.category as "sport" | "repas";
  
  // Si on a un filtre, on cherche { category: "sport" }, sinon on cherche tout {}
  const query = categoryFilter ? { category: categoryFilter } : {};

  // Syntaxe MongoDB native (identique à ApplyUp)
  const calories = await db.collection<CaloryEntry>("entries").find(query).toArray();
  
  res.status(200).json(calories);
});

// POST /calories : Ajouter
caloryRoutes.post("/", async (req, res) => {
  const newEntry = req.body as CaloryEntry;

  // Validation avec TES champs
  if (!newEntry.label || !newEntry.qtyCalory || !newEntry.category) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  // Insertion MongoDB native
  const result = await db.collection<CaloryEntry>("entries").insertOne(newEntry);
  
  res.status(201).json({ ...newEntry, _id: result.insertedId });
});
// Complète cette ligne :
// Dans caloriesRoutes.ts


caloryRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("1. SERVEUR : Reçu ID :", id);

  try {
      const mongoId = new ObjectId(id);
      console.log("2. SERVEUR : ID Transformé en ObjectId");

      // Vérifie bien le nom de la collection ici ("entries" ? "calories" ?)
      const result = await db.collection("entries").deleteOne({ _id: mongoId });
      
      console.log("3. SERVEUR : Résultat MongoDB :", result);

      res.status(200).json(result);
  } catch (e) {
      console.error("ERREUR SERVEUR :", e);
      res.status(500).json({error: "Erreur interne"});
  }
});