import { Recipe } from '@src/models/recipe';
import oneRecipeFixture from '../fixtures/one_recipe_fixture.json';

describe('Recipes functional tests', () => {
  describe('When creating a recipe', () => {
    beforeAll(async () => await Recipe.deleteMany({}));
    it('should create a recipe with success', async () => {
      const response = await global.testRequest
        .post('/recipe')
        .send(oneRecipeFixture);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(oneRecipeFixture);
    });

    it('should return 422 when there is a validation error', async () => {
      const newRecipe = {};

      const response = await global.testRequest.post('/recipe').send(newRecipe);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Recipe validation failed: author: Path `author` is required., ' +
          'title: Path `title` is required.',
      });
    });
  });

  describe('When getting recipes', () => {
    beforeAll(async () => {
      await Recipe.deleteMany({});
      const recipe = new Recipe(oneRecipeFixture);
      recipe.save();
    });

    it('should return all recipes from database', async () => {
      const response = await global.testRequest.get('/recipe');
      expect(response.status).toBe(200);
      expect(response.body).toContainEqual(oneRecipeFixture);
    });

    it('should return an specific recipe', async () => {
      const response = await global.testRequest.get(
        '/recipe/?title=' + encodeURI(oneRecipeFixture.title)
      );
      expect(response.status).toBe(200);
      expect(response.body).toContainEqual(oneRecipeFixture);
    });
  });
});
