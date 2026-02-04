import { Router } from "express";
export const caloryRoutes = Router();

caloryRoutes.get("/", async (request, response) => {
  response.json({message: "Liste des calories"})
});