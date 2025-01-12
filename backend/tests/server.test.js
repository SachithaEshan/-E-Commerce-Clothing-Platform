require("dotenv").config();

const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URL;
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db("e-sportswear");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Insert a Doc Into Collection", async () => {
    const users = db.collection("users");

    const mockUser = { _id: "TEST-USER-ID", name: "TEST-NAME" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "TEST-USER-ID" });
    expect(insertedUser).toEqual(mockUser);
  });

  it("Read a Doc From the Collection", async () => {
    const users = db.collection("users");

    const user = await users.findOne({ _id: "TEST-USER-ID" });
    expect(user).not.toBeNull();
    expect(user.name).toBe("TEST-NAME");
  });

  it("Update a Doc In the Collection", async () => {
    const users = db.collection("users");

    await users.updateOne(
      { _id: "TEST-USER-ID" },
      { $set: { name: "TEST-NAME-UPDATE" } }
    );

    const updatedUser = await users.findOne({ _id: "TEST-USER-ID" });
    expect(updatedUser.name).toBe("TEST-NAME-UPDATE");
  });

  it("Delete a Doc From the Collection", async () => {
    const users = db.collection("users");

    const deleteResult = await users.deleteOne({ _id: "TEST-USER-ID" });
    expect(deleteResult.deletedCount).toBe(1);

    const deletedUser = await users.findOne({ _id: "TEST-USER-ID" });
    expect(deletedUser).toBeNull();
  });
});
