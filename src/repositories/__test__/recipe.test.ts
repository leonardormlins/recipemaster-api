import RecipeRepository from '@src/repositories/repice';
import oneRecipeFixture from '@test/fixtures/one_recipe_fixture.json';

jest.mock('@src/repositories/repice');

describe('Recipe repositoy', () => {
  const recipe = new RecipeRepository();
  const mockedRecipe = recipe as jest.Mocked<typeof recipe>;
  it('should create and return a recipe', async () => {
    const expectedResponse = {
      code: 201,
      error: undefined,
      recipe: oneRecipeFixture,
    };
    mockedRecipe.create.mockResolvedValue(expectedResponse);
    const response = await mockedRecipe.create(oneRecipeFixture);
    expect(response).toEqual(expectedResponse);
  });
});
