import { Recipe } from '@src/models/recipe';
import { Request } from 'express';
import mongoose from 'mongoose';

interface RepositoryResponse {
  code: number;
  error: object | undefined;
  recipe: Recipe | undefined;
}

export const create = async (req: Request): Promise<RepositoryResponse> => {
  try {
    const recipe = new Recipe(req.body);
    const response = await recipe.save();
    return { code: 201, error: undefined, recipe: response };
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const newError: RepositoryResponse = {
        code: 422,
        error: { error: error.message },
        recipe: undefined,
      };
      return newError;
    } else {
      const newError: RepositoryResponse = {
        code: 500,
        error: { error: 'Somenthing went wrong' },
        recipe: undefined,
      };
      return newError;
    }
  }
};

export const findAll = async (): Promise<RepositoryResponse> => {
  try {
    const recipes = await Recipe.find({});
    return { code: 200, error: undefined, recipe: recipes };
  } catch (error) {
    const newError: RepositoryResponse = {
      code: 500,
      error: { error: 'Internal Several Error' },
      recipe: undefined,
    };
    return newError;
  }
};
