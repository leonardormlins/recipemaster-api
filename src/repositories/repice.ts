import { Recipe } from '@src/models/recipe';
import mongoose from 'mongoose';

interface RepositoryResponse {
  code: number;
  error: string | undefined;
  recipe: Recipe | undefined;
}

interface PayloadIngredients {
  name: string;
  amount: string;
  unit: string;
}

interface Payload {
  title: string;
  author: string;
  ingredients: PayloadIngredients[];
  directions: string[];
}

export default class RecipeRepository {
  public async create(payload: Payload): Promise<RepositoryResponse> {
    try {
      const recipe = new Recipe(payload);
      const response = await recipe.save();
      return { code: 201, error: undefined, recipe: response };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        const newError: RepositoryResponse = {
          code: 422,
          error: error.message,
          recipe: undefined,
        };
        return newError;
      } else {
        const newError: RepositoryResponse = {
          code: 500,
          error: 'Somenthing went wrong',
          recipe: undefined,
        };
        return newError;
      }
    }
  }

  async findAll(): Promise<RepositoryResponse> {
    try {
      const recipes = await Recipe.find({});
      return { code: 200, error: undefined, recipe: recipes };
    } catch (error) {
      const newError: RepositoryResponse = {
        code: 500,
        error: 'Internal Several Error',
        recipe: undefined,
      };
      return newError;
    }
  }
}
