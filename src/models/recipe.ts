import mongoose, { Document, Model } from 'mongoose';

export interface Recipe {
  _id?: string;
  title: string;
  author: string;
  ingredients: [];
  directions: [];
}

export interface Ingredients {
  _id?: string;
  name: string;
  amount: string;
  unit: string;
}

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ingredients: {
      type: [{ name: String, amount: String, unit: String }],
      required: true,
    },
    directions: { type: [String], required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.ingredients.map((ingr: Ingredients) => delete ingr._id);
        delete ret.id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface RecipeModel extends Omit<Recipe, '_id'>, Document {}
export const Recipe: Model<RecipeModel> = mongoose.model('Recipe', schema);
