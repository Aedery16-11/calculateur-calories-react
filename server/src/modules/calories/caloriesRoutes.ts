import { Router } from "express";
import { db } from "../../db";
import { CaloryEntry, caloryEntrySchema } from "./caloriesModels";
import { ObjectId } from "mongodb";
import { authMiddleware, JwtPayload } from "../auth/jwt";
import { validator } from "../../validator";
export const caloryRoutes = Router();

caloryRoutes.use(authMiddleware);

// GET /calories : Lister (avec filtre optionnel sur category)
caloryRoutes.get("/", async (req, res) => {
  const { userId } = (req as any).auth as JwtPayload;
  console.log(`User ${userId} is fetching calories`);

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

  //si il manque le label ou la quantité ou la catégorie, on renvoie une erreur
  if (!newEntry.label || !newEntry.qtyCalory || !newEntry.category) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  //on copie les données de newEntry et on ajoute la date d'ajout en plus
  const entryToSave = {
    ...newEntry,
    dateAjout: new Date()
  };

  //et du conp c'est entryToSave qu'on va 
  const result = await db.collection<CaloryEntry>("entries").insertOne(entryToSave);
  
  res.status(201).json({ ...entryToSave, _id: result.insertedId }); // On renvoie l'entrée avec son ID généré par MongoDB
});



caloryRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;

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