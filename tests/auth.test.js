const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const expect = chai.expect;

chai.use(chaiHttp);

let user = "3442f8959a84dea7ee197c632cb2df15"
let password = 13023

describe('Login Route', () => {
    it('should return 400 for bad request', async () => {
        const res = await chai.request(server)
            .post('/api/v1/login')
            .send({});

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').that.equals('Bad request');
    });

    it('should return 404 for user not found', async () => {
        const res = await chai.request(server)
            .post('/api/v1/login')
            .send({ username: 'nonexistentuser', password });

        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').that.equals('User not found');
    });

    it('should return 401 for incorrect password', async () => {
        const res = await chai.request(server)
            .post('/api/v1/login')
            .send({ username: user, password: 'incorrectpassword' });

        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').that.equals('User password is incorrect');
    });

    it('should return 200 and token for successful login', async () => {
        // Assuming you have an existing user with known credentials
        const res = await chai.request(server)
            .post('/api/v1/login')
            .send({ username: user, password });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.equals('Login Successful!');
        expect(res.body).to.have.property('token');
    });

    // Add more test cases as needed
});
