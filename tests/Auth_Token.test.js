const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";
var token = ''
describe("POST Criação do token", () => {


    it("Cadastrar uma reserva", () => {
        const credentials = {
            "username": "admin",
            "password": "password123"
        }

        return request(ApiUrl)
            .post('/auth/')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .expect(200)
            .then(response => {
                console.log(response.body)
                token = response.body.token

            })
    })

})