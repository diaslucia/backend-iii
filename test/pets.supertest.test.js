import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Adoptame App Tests", () => {
  describe("Pets API Tests", () => {
    it("should successfully create a pet using POST /api/pets", async () => {
      const petMock = {
        name: "Booker",
        specie: "Cat",
        birthDate: "19-09-2015",
      };

      const { statusCode, _body } = await requester
        .post("/api/pets")
        .send(petMock);
      expect(statusCode).to.equal(200);
      expect(_body.payload).to.have.property("_id");
    });

    it("should set the 'adopted' property to false when only basic pet data is provided", async () => {
      const petMock = {
        name: "Booker",
        specie: "Cat",
        birthDate: "19-09-2015",
      };

      const { statusCode, _body } = await requester
        .post("/api/pets")
        .send(petMock);

      expect(statusCode).to.equal(200);
      expect(_body.payload).to.have.property("adopted").that.equals(false);
    });

    it("should return status 400 when attempting to create a pet without the 'name' field", async () => {
      const petMock = {
        specie: "Cat",
        birthDate: "19-09-2015",
      };
      const { statusCode } = await requester.post("/api/pets").send(petMock);
      expect(statusCode).to.equal(400);
    });

    it("should return a response with 'status' and 'payload' properties, where 'payload' is an array, when fetching pets via GET /api/pets", async () => {
      const { statusCode, _body } = await requester.get("/api/pets");
      expect(statusCode).to.equal(200);
      expect(_body).to.have.property("payload").that.is.an("array");
    });

    it("should successfully update a specific pet using PUT /api/pets/:id", async () => {
      const petId = "67abcf871cdac0a1fcc6988c";

      const petMock = {
        specie: "Cat",
        birthDate: "19-09-2015",
      };

      const { statusCode } = await requester
        .put(`/api/pets/${petId}`)
        .send(petMock);
      expect(statusCode).to.equal(200);
    });

    it("should delete the most recently added pet using DELETE /api/pets/:id", async () => {
      const petMock = {
        name: "Booker",
        specie: "Cat",
        birthDate: "19-09-2015",
      };

      const {
        _body: {
          payload: { _id },
        },
      } = await requester.post("/api/pets").send(petMock);

      const { statusCode } = await requester.delete(`/api/pets/${_id}`);

      expect(statusCode).to.equal(200);
    });
  });
});
