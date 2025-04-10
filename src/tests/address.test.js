const request = require('supertest');
const app = require('../src/app'); // Update if your main file is named differently
const mongoose = require('mongoose');
const Address = require('../src/models/Address');

beforeAll(async () => {
    // Connect to test DB
    await mongoose.connect('mongodb://localhost:27017/address_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Address API Tests', () => {
    it('should create a new address and return a shortCode', async () => {
        const res = await request(app)
            .post('/addresses')
            .send({
                county: "Nairobi",
                subCounty: "Westlands",
                buildingName: "Sky Tower",
                floor: 5,
                unit: "A5",
                streetDirection: "North",
                isFlat: true
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('shortCode');
    });

    it('should return 400 for missing county', async () => {
        const res = await request(app)
            .post('/addresses')
            .send({
                subCounty: "Westlands",
                buildingName: "Sky Tower",
                floor: 5,
                unit: "A5",
                streetDirection: "North",
                isFlat: true
            });

        expect(res.statusCode).toEqual(400);
    });

    it('should fetch an existing address by shortCode', async () => {
        const newAddress = await Address.create({
            county: "Nairobi",
            subCounty: "Kilimani",
            buildingName: "Greenside",
            floor: 2,
            unit: "B2",
            streetDirection: "East",
            isFlat: true,
            shortCode: "NK2G2EB"
        });

        const res = await request(app).get(`/addresses/${newAddress.shortCode}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.county).toBe("Nairobi");
        expect(res.body.unit).toBe("B2");
    });

    it('should return 404 for unknown shortCode', async () => {
        const res = await request(app).get('/addresses/UNKNOWN123');
        expect(res.statusCode).toBe(404);
    });
});
