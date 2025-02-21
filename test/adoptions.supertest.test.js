import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Adoptame App Tests", () => {
  it("should successfully GET all adoptions /api/adoptions", async () => {
    const { statusCode, _body } = await requester.get("/api/adoptions");

    expect(statusCode).to.equal(200);
    expect(_body).to.have.property("payload").that.is.an("array");
  });

  it("should successfully GET an adoption by ID /api/adoptions/:aid", async () => {
    const adoptionId = "67b4f4f7e02d22de3d4433bf";

    const { statusCode, _body } = await requester.get(
      `/api/adoptions/${adoptionId}`
    );

    expect(statusCode).to.equal(200);
    expect(_body.payload).to.have.property("_id");
  });

  it("should successfully POST an adoption /api/adoptions/:uid/:pid", async () => {
    const petMock = {
      name: "Booker",
      specie: "Cat",
      birthDate: "2015-09-19",
    };

    const { _body } = await requester.post("/api/pets").send(petMock);

    const userId = "67b7cc67ec933d430cd68d17";

    const { statusCode } = await requester.post(
      `/api/adoptions/${userId}/${_body.payload._id}`
    );

    expect(statusCode).to.equal(200);
    expect(_body.payload).to.have.property("_id");
  });

  it("should get an error if pet is already adopted in /api/adoptions/:uid/:pid", async () => {
    const petId = "67ae0a38ccc67cbad81c27d1";
    const userId = "67b7cc67ec933d430cd68d17";

    const { statusCode } = await requester.post(
      `/api/adoptions/${userId}/${petId}`
    );

    expect(statusCode).to.equal(409);
  });
});
