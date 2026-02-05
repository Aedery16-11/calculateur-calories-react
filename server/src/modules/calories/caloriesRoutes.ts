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
  const dateAjout = req.query.dateAjout; //pour faire le filtre de date on récupère la date
  const query = dateAjout //si la date est fournie on ajoute la date au query sinon on ne met que l'ID de l'utilisateur pour récupérer toutes ses entrées
    ? { userId: userId, dateAjout: dateAjout } //c'est le cas où elle est fournie
    : { userId: userId }; //c'est le cas où elle n'est pas fournie on veut juste récupérer toutes les entrées de l'utilisateur x
  const calories = await db
    .collection<CaloryEntry>("entries")
    .find(query)
    .sort({ dateAjout: -1 }) // On garde ton tri (le plus récent en haut)
    .toArray();

  res.status(200).json(calories);
});


// POST /calories : Ajouter
caloryRoutes.post("/", async (req, res) => {
  const newEntry = req.body as CaloryEntry;
  const { userId } = (req as any).auth;
  //si il manque le label ou la quantité ou la catégorie, on renvoie une erreur
  if (!newEntry.label || !newEntry.qtyCalory || !newEntry.category) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  //on copie les données de newEntry et on ajoute la date d'ajout en plus
  const entryToSave = {
    ...newEntry,
    dateAjout: new Date(),
    userId: userId,
  };

  //et du conp c'est entryToSave qu'on va
  const result = await db
    .collection<CaloryEntry>("entries")
    .insertOne(entryToSave);

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
