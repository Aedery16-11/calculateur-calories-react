import { Router } from "express";
import Joi from "joi";
import { validator } from "../../validator";
import { createAuthToken } from "./jwt";

import { CaloryEntry } from "../calories/caloriesModels";
import { db } from "../../db";
export const authRoutes = Router();

export type LoginData = {
  email: string;
  password: string;
};
const loginInfoDataSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

authRoutes.post(
  "/login",
  validator.body(loginInfoDataSchema),
  async (request, response) => {
    const { email, password } = request.body as LoginData;
    const user = await db.collection("users").findOne({ email: email }); //on cherche dans la collection users un document qui a le même email que celui fourni par le client
    if (user && user.password === password) { //si on trouve un utilisateur et que le mot de passe correspond
      const token = createAuthToken({ //alors c'est bon on peut creer le token 
        userId: user._id.toString(),
        role: user.role,
      });

      response.json({ token }); //et on renvoie le toke
    } else { //par contre sinon on envoie uen erreur
      response.status(401).json({ message: "Invalid credentials" });
    }
  },
);
authRoutes.post(
  "/signup",
  validator.body(loginInfoDataSchema),
  async (request, response) => {
    const { email, password } = request.body as LoginData;
    const newUser = { ...request.body, role: "user" };
    const result = await db.collection("users").insertOne(newUser); //on créer la collection users et on y insère le nouvel utilisateur
    const token = createAuthToken({
      userId: result.insertedId.toString(), //on utilise l'ID généré par MongoDB pour le token
      role: "user", //par défaut, tous les nouveaux utilisateurs sont user car y'a qu'un admin
    });

    response.status(201).json({ token }); // On renvoie le token au client pour qu'il puisse s'authentifier
  },
);
