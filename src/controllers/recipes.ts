import { Controller, Post } from '@overnightjs/core';
import { Recipe } from '@src/models/recipe';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { resourceLimits } from 'worker_threads';

@Controller('recipe')
export class RecipeController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const recipe = new Recipe(req.body);
      const result = await recipe.save();
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
