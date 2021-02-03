import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Repository } from '@src/repositories/repice';

const repository = new Repository();

@Controller('recipe')
export class RecipeController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const response = await repository.create(req.body);
    res
      .status(response.code)
      .send(response.recipe || { error: response.error });
  }

  @Get('')
  public async getAllRecipes(_: Request, res: Response): Promise<void> {
    const response = await repository.findAll();
    res
      .status(response.code)
      .send(response.recipe || { error: response.error });
  }
}
