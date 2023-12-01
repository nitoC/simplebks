const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const expect = chai.expect;
const { describe, it } = require('mocha')



chai.use(chaiHttp);

let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njk4YjQwNzZmNTJhZGIzMTNjZDRhMSIsInNlbGxlciI6IjM0NDJmODk1OWE4NGRlYTdlZTE5N2M2MzJjYjJkZjE1IiwiaWF0IjoxNzAxNDUwNzIyLCJleHAiOjE3MDIzMTQ3MjJ9.1SRomCWV_mE2Nibvv1ubV1GJq0IEdPvLGThIUNJWjTs`
describe('Order Route', () => {
    describe('GET /order', () => {

        it('should return orders for a seller', async () => {
            // Assuming you have a valid seller token and an existing seller
            const res = await chai.request(server)
                .get('/api/v1/order_items')
                .set('Authorization', token);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('total');
            expect(res.body).to.have.property('limit');
            expect(res.body).to.have.property('offset');
        });
        it('should return orders for a seller', async () => {
            // Assuming you have a valid seller token and an existing seller
            const res = await chai.request(server)
                .get('/api/v1/order_items?limit=27&offset=0')
                .set('Authorization', token);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('total');
            expect(res.body).to.have.property('limit');
            expect(res.body).to.have.property('offset');
        });


    });


});
