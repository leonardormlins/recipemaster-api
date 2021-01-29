import supertest from 'supertest';

describe('Recipes functional tests', ()=> {
    it('should return recipes', async ()=> {
        const { body, status } = await global.testRequest.get('/recipes');
        expect(status).toBe(200);
        expect(body).toEqual({ 'recipe': 'recipeOne' });
    });
});