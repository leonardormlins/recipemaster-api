import { Recipe } from '@src/models/recipe';

describe('Recipes functional tests', () => {
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

  describe('When creating a recipe', () => {
    beforeAll(async () => await Recipe.deleteMany({}));
    it('should create a recipe with success', async () => {
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

  describe('When getting recipes', () => {
    beforeAll(async () => {
      await Recipe.deleteMany({});
      const recipe = new Recipe(newRecipe);
      recipe.save();
    });

    it('should return all recipes from database', async () => {
      const response = await global.testRequest.get('/recipe');
      expect(response.status).toBe(200);
      expect(response.body).toContainEqual(newRecipe);
    });

    it('should return an specific recipe', async () => {
      const response = await global.testRequest.get(
        '/recipe/?title=' + encodeURI(newRecipe.title)
      );
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toContainEqual(newRecipe);
    });
  });
});
