const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index.js');
let expect = chai.expect;
chai.use(chaiHttp)


let token = ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njk4YjQwNzZmNTJhZGIzMTNjZDRhMSIsInNlbGxlciI6IjM0NDJmODk1OWE4NGRlYTdlZTE5N2M2MzJjYjJkZjE1IiwiaWF0IjoxNzAxNDUwNzIyLCJleHAiOjE3MDIzMTQ3MjJ9.1SRomCWV_mE2Nibvv1ubV1GJq0IEdPvLGThIUNJWjTs`

describe('account route ', () => {
    it('should return 400 for bad request', async () => {
        const res = await chai.request(server)
            .patch('/api/v1/account')
            .send({})
            .set('Authorization', token);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').that.equals('bad request');
    });

    it('should update both city and state', async () => {
        const res = await chai.request(server)
            .patch('/api/v1/account')
            .send({ city: 'New City', state: 'New State' })
            .set('Authorization', token);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.equals('success');
        expect(res.body.data).to.have.property('city').that.equals('New City');
        expect(res.body.data).to.have.property('state').that.equals('New State');
    }).timeout(50000);


    it('should update only city', async () => {
        const res = await chai.request(server)
            .patch('/api/v1/account')
            .send({ city: 'one New City' })
            .set('Authorization', token);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.equals('success');
        expect(res.body.data).to.have.property('city').that.equals('one New City');
    });

    it('should update only state', async () => {
        const res = await chai.request(server)
            .patch('/api/v1/account')
            .send({ state: 'two New State' })
            .set('Authorization', token);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.equals('success');
        expect(res.body.data).to.have.property('state').that.equals('two New State');
    });

});