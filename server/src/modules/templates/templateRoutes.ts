import { Router } from "express";
import { db } from "../../db";
import { TemplateEntry, templateEntrySchema } from "./templateModels";
import { authMiddleware, JwtPayload } from "../auth/jwt"; // Assure-toi que JwtPayload est exporté dans jwt.ts
import { validator } from "../../validator";

export const templateRoutes = Router();

templateRoutes.use(authMiddleware); //middleware pour sécuriser la route selon les règles du middleware qui sont 

templateRoutes.get("/", async (req, res) => { //pour récup les templates
  const templates = await db.collection<TemplateEntry>("templates").find().toArray();
  res.status(200).json(templates);
});


templateRoutes.post("/", validator.body(templateEntrySchema), async (req, res) => { //ajouter une template, que pour l'admin
  const user = (req as any).auth as JwtPayload; // récupérer les infos de l'utilisateur à partir du token 

  if (user.role !== "admin") { //si le role de l'utilisateur n'est pas admin alors on refuse l'accès
    return res.status(403).json({ error: "Accès refusé. Réservé aux administrateurs." }); //et on renvoie une erreur
  }

  const newTemplate = req.body as TemplateEntry; //à partir de la requête on fait un objet newtemplate qui a notre nouveau type 
  const result = await db.collection<TemplateEntry>("templates").insertOne(newTemplate); //et on l'insère dans une nouvelle collection
  
  res.status(201).json({ ...newTemplate, _id: result.insertedId });
});