import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import { connectMongoDB } from "../src/config/mongo.config.js";
import { expect } from "chai";

describe("Testing User DAO", function () {
  before(async function () {
    await connectMongoDB();
    this.usersDao = new User();
  });

  beforeEach(async function () {
    await mongoose.connection.collections.users.drop();
  });

  it("get should return an array", async function () {
    const result = await this.usersDao.get();
    expect(Array.isArray(result)).to.be.true;
  });

  it("DAO should correctly add an element to the database", async function () {
    let user = {
      first_name: "Bruno",
      last_name: "Diaz",
      email: "batman@gmail.com",
      password: "arkham123",
    };

    const result = await this.usersDao.save(user);
    expect(result).to.have.property("_id");
  });

  it("A new user should be created with an empty pets array by default", async function () {
    let user = {
      first_name: "Bruno",
      last_name: "Diaz",
      email: "batman@gmail.com",
      password: "arkham123",
    };

    const result = await this.usersDao.save(user);
    expect(result.pets).to.deep.equal([]);
  });

  it("DAO should be able to retrieve a user by email", async function () {
    let user = {
      first_name: "Bruno",
      last_name: "Diaz",
      email: "batman@gmail.com",
      password: "arkham123",
    };

    await this.usersDao.save(user);
    const foundUser = await this.usersDao.getBy({ email: user.email });
    expect(foundUser).to.be.an("object");
  });

  after(async function () {
    await mongoose.disconnect();
  });
});
