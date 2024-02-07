const request = require('supertest');
const express = require('express');
const health = require('../controllers/health');
const db = require('../../models')

const app = express();
app.use(express.json());

app.get('/healthz', health.healthCheck);
app.all('/healthz', async (req, res) => {
    res.status(405).header('Cache-Control','no-cache').send();
})

describe('Health API', () => {
    it('should return 200 OK for a valid health check', async () => {
        const response = await request(app).get('/healthz');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({}); 
    });

    it('should return 405 Method Not Found if api is called with other methods', async () => {
        const response = await request(app).post('/healthz').expect(405);
      
    });

    it('should return 400 Bad Request for a health check with request body', async () => {
        const response = await request(app)
            .get('/healthz')
            .send({ data: 'hello' });
        expect(response.status).toBe(400);
    });

    it('should return 503 Service Unavailable for a failing health check', async () => {
        jest.spyOn(db.sequelize, 'authenticate').mockImplementationOnce(() => {
            throw new Error('Simulated authentication failure');
        });

        const response = await request(app).get('/healthz');
        expect(response.status).toBe(503);

        db.sequelize.authenticate.mockRestore();
    });
});

// describe('Initial Test', () => {
//     it('should test that 1 + 1 === 2', () => {
//       expect(1+1).toBe(2)
//     })
//   })