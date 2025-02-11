const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";

var token = '';
var bookingid = '';

describe("Testes de API com Supertest", () => {

    it("Criar token de autenticação", () => {
        const credentials = {
            "username": "admin",
            "password": "password123"
        };

        return request(ApiUrl)
            .post('/auth/')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .expect(200)
            .then(response => {
                console.log("Token gerado:", response.body);
                token = response.body.token;
            });
    });

    it("Criar uma reserva", () => {
        const newBooking = {
            "firstname": "Michael",
            "lastname": "Silva",
            "totalprice": 3000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        };

        return request(ApiUrl)
            .post('/booking/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(newBooking)
            .expect(200)
            .then(response => {
                console.log("Reserva criada:", response.body);
                expect(response.body.booking.firstname).toEqual('Michael');
                expect(response.body.booking.lastname).toEqual('Silva');
                bookingid = response.body.bookingid;
            });
    });

    it("Atualizar reserva com PUT", () => {
        const updatedBooking = {
            "firstname": "Michael",
            "lastname": "Santos",
            "totalprice": 7000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2019-01-01",
                "checkout": "2020-01-01"
            },
            "additionalneeds": "Dinner"
        };

        return request(ApiUrl)
            .put(`/booking/${bookingid}`)  // Corrigido de `post` para `put`
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', `token=${token}`)  // Outra opção é usar Authorization
            .send(updatedBooking)
            .expect(200)
            .then(response => {
                console.log("Reserva atualizada:", response.body);
                expect(response.body.firstname).toEqual('Michael');
                expect(response.body.lastname).toEqual('Santos');
                expect(response.body.totalprice).toEqual(7000);
                expect(response.body.depositpaid).toBeTruthy();
                expect(response.body.bookingdates.checkin).toEqual('2019-01-01');
                expect(response.body.bookingdates.checkout).toEqual('2020-01-01');
                expect(response.body.additionalneeds).toEqual('Dinner');
            });
    });
});
