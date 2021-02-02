import { Controller, Get, Post } from '@overnightjs/core';
import { Recipe } from '@src/models/recipe';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { resourceLimits } from 'worker_threads';
import { create, findAll } from '@src/repositories/repice';

@Controller('recipe')
export class RecipeController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const response = await create(req);
    res.status(response.code).send(response.recipe || response.error);
  }

  @Get('')
  public async getAllRecipes(_: Request, res: Response): Promise<void> {
    const response = await findAll();
    res.status(response.code).send(response.recipe || response.error);
  }
}
