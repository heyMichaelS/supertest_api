const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";

describe("POST Reservas",() =>{
    it("Cadastrar uma reserva", () =>{
        const newBooking ={
            "firstname": "Michael",
            "lastname": "Silva",
            "totalprice": 3000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
        return request(ApiUrl)
        .post('/booking/')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(newBooking)
        .expect(200)
        .then(response => {
            console.log(response.body)
            expect(response.body.booking.firstname).toEqual('Michael');
            expect(response.body.booking.lastname).toEqual('Silva');
            expect(response.body.booking.totalprice).toEqual(3000);
            expect(response.body.booking.depositpaid).toBeTruthy();
            expect(response.body.booking.bookingdates.checkin).toEqual('2018-01-01');
            expect(response.body.booking.bookingdates.checkout).toEqual('2019-01-01');
            expect(response.body.booking.additionalneeds).toEqual('Breakfast');
            
        })

    })
    

});

