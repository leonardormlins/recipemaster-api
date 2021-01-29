import { Controller, Post } from '@overnightjs/core';
import { Recipe } from '@src/models/recipe';
import { Request, Response } from 'express';

@Controller('recipe')
export class RecipeController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const recipe = new Recipe(req.body);
    const result = await recipe.save();
    res.status(201).send(result);
  }
}
