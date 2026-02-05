import express from "express";
import cors from "cors";
import { caloryRoutes } from "./modules/calories/caloriesRoutes";
import { authRoutes } from "./modules/auth/authRoutes";
import { templateRoutes } from "./modules/templates/templateRoutes";
const app = express();
app.use(cors());
app.use(express.json());

//app.use sert à régir les lois d'une route par les règles dans le fichier de la route
app.use("/calories", caloryRoutes);
app.use("/auth", authRoutes);
app.use("/templates", templateRoutes); 

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
