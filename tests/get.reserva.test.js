const request = require("supertest");
const ApiUrl = "https://restful-booker.herokuapp.com";

it("Deve retornar 200 ao  fazer o GET em booking",() =>{
    return request(ApiUrl).get("/booking/").expect(200)
});

