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
  const { userId } = (req as any).auth; //on recupère l'ID de l'utilisateur à partir du token d'authentification
  console.log(`User ${userId} is fetching calories`);
  const dateAjout = req.query.dateAjout as string; 
  let query: any = { userId: userId };

  if (dateAjout) {
    const start = new Date(dateAjout);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dateAjout);
    end.setHours(23, 59, 59, 999);
    query.dateAjout = { $gte: start, $lte: end };
  }

  const calories = await db
    .collection<CaloryEntry>("entries")
    .find(query)
    .sort({ dateAjout: -1 }) // On garde ton tri (le plus récent en haut)
    .toArray();

  res.status(200).json(calories);
});


// POST /calories : Ajouter
caloryRoutes.post("/", validator.body(caloryEntrySchema), async (req, res) => {
  const newEntry = req.body as CaloryEntry;
  const { userId } = (req as any).auth;

  //on copie les données de newEntry et on ajoute la date d'ajout en plus
  const entryToSave = {
    ...newEntry,
    dateAjout: new Date(),
    userId: userId,
  };

  //et du conp c'est entryToSave qu'on va
  const result = await db
    .collection<CaloryEntry>("entries")
    .insertOne(entryToSave as any);

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
    res.status(500).json({ error: "Erreur interne" });
  }
});
