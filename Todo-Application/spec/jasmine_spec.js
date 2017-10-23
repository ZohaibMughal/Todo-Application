var request = require("request");
var server = require("../bin/www")
var base_url = "http://localhost:3000/"

describe("Jasemine Testing", function() {
  
  describe("GET /", function() {
    it("Status Code:200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("Response:Body", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("Express is Good!");
        done();
      });
    });
  });

  describe("GET /api", function() {
    it("Status Code:200", function(done) {
      request.get(base_url + "api", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("Response:Body", function(done) {
      request.get(base_url + "api", function(error, response, body) {
        var data = JSON.parse(body);
        expect(data.message).toBe("Welcome to the Todos API!");
        done();
      });
    });
  });

    describe("GET /api/todos", function() {
      it("Status Code:200", function(done) {
        request.get(base_url + "api/todos", function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
  
      it("Response:Body", function(done) {
        request.get(base_url + "api/todos", function(error, response, body) {
          var data = JSON.parse(body);
          expect(body).toNotBe("Welcome to the Todos API!");
          done();
        });
      });

      it("Status Body:OK", function(done) {
          request.get(base_url + "api/todos", function(error, response, body) {
            expect(response.statusMessage).toEqual("OK");
            done();
        });
      });
    });

    describe("POST /api/todos", function() {
      it("Status Code:400", function(done) {
        request.post(base_url + "api/todos", function(error, response, body) {
          expect(response.statusCode).toNotEqual(201);
          done();
        });
      });
  
      it("Response:Body", function(done) {
        request.post(base_url + "api/todos", function(error, response, body) {
          var data = JSON.parse(body);
          expect(data).toNotBe("Welcome to the Todos API!");
          done();
        });
      });
    });

    describe("DELETE /api/todos", function() {
      it("Status Code:404", function(done) {
        request.delete(base_url + "api/todos", function(error, response, body) {
          expect(response.statusCode).toEqual(404);
          server.closeServer();
          done();
        });
      });
    });
});