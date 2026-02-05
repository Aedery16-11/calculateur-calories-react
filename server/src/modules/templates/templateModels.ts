import { ObjectId } from "mongodb";
import Joi from "joi";

export interface TemplateEntry {
  _id?: ObjectId;
  label: string;
  qtyCalory: number;
  category: "sport" | "repas";
}

export const templateEntrySchema = Joi.object({
  label: Joi.string().required(),
  qtyCalory: Joi.number().required(),
  category: Joi.string().valid("sport", "repas").required(),
});