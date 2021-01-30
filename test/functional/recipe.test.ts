import { Recipe } from '@src/models/recipe';

describe('Recipes functional tests', () => {
  beforeAll(async () => await Recipe.deleteMany({}));
  describe('When creating a recipe', () => {
    it('should create a recipe with success', async () => {
      const newRecipe = {
        title: 'Thanksgiving Quesadilla',
        author: 'Gevans',
        ingredients: [
          {
            name: 'Flour tortillas',
            amount: '2',
            unit: '',
          },
          {
            name: 'Shredded Cheddar cheese',
            amount: '1/2',
            unit: 'cup',
          },
        ],
        directions: [
          'Heat a skillet over medium heat. Place 1 tortilla...',
          'Cook until tortilla is golden ...',
        ],
      };

      const response = await global.testRequest.post('/recipe').send(newRecipe);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newRecipe);
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

  describe('When creating a recipe', () => {});
});
