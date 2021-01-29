describe('Recipes functional tests', () => {
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
  });
});
