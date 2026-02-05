import { ObjectId } from "mongodb";
import Joi from "joi";

// On définit la forme de nos données (Interface)
export interface UserEntry {
  _id?: ObjectId;
  email: string;
  password: string;
  role: "user" | "admin"; //soit l'un soit l'autre
}

export const userEntrySchema = Joi.object<UserEntry>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").required(),
});
