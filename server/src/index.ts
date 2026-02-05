import express from "express";
import cors from "cors";
import { caloryRoutes } from "./modules/calories/caloriesRoutes";
import { authRoutes } from "./modules/auth/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/calories", caloryRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
