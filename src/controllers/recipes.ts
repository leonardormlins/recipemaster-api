import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('recipes')
export class RecipeController {
    
    @Get('')
    public getRecipesForLoggedUser(_: Request, res: Response): void {
        res.send({'recipe': 'recipeOne'})
    }
}