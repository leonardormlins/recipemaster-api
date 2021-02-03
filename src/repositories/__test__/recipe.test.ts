import { Repository } from '@src/repositories/repice';
import oneRecipeFixture from '@test/fixtures/one_recipe_fixture.json';

describe('Recipe repositoy', () => {
  it('should create and return a recipe', async () => {
    const repository = new Repository();
    repository.create = jest.fn().mockResolvedValue(oneRecipeFixture);
    const response = await repository.create(oneRecipeFixture);
    expect(response).toEqual(oneRecipeFixture);
  });
});
