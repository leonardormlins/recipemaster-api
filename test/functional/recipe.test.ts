import supertest from 'supertest';

const app = "";

describe('Recipes functional tests', ()=> {
    it('should return recipes', async ()=> {
        const { body, status } = await supertest(app).get('/recipes');
        expect(status).toBe(200);
        expect(body).toBe({
            'recipe': 'recipeOne'
        });
    });
});