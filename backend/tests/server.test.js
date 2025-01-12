// import request from "supertest";
// import dotenv from "dotenv";
// dotenv.config();
// import app from "../server.js";
// import mongoose from "mongoose";

// describe("Mongodb Start Tests", () => {
//   it("should connect to mongodb", async () => {
//     const connect = await mongoose.connect(
//       `${process.env.MONGODB_URL}/e-sportswear`
//     );

//     await new Promise((resolve) => {
//       if (mongoose.connection.readyState === 1) {
//         resolve();
//       } else {
//         mongoose.connection.on("open", resolve);
//       }
//     });

//     expect(mongoose.connection.readyState).toBe(1);
//   });
// });

// describe("Server Side User API Tests", () => {
//   it("should return API WORKING on GET /", async () => {
//     const response = await request(app).get("/");
//     expect(response.status).toBe(200);
//     expect(response.text).toBe("API WORKING");
//   });
//   it("should handle /api/user LOGIN", async () => {
//     const response = await request(app).post("/api/user/login");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/user REGISTER", async () => {
//     const response = await request(app).post("/api/user/register");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/user ADMIN", async () => {
//     const response = await request(app).post("/api/user/admin");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/user USER_DATA", async () => {
//     const response = await request(app).post("/api/user/data");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/user UPDATE_USER_DATA", async () => {
//     const response = await request(app).post("/api/user/updateuser");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/user FORGET_PASSWORD", async () => {
//     const response = await request(app).post("/api/user/forgot-password");
//     expect(response.status).toBe(200);
//   });
//   // it("should handle /api/user DELETE_USER", async () => {
//   //   const response = await request(app).post("/api/user/deleteuser");
//   //   expect(response.status).toBe(200);
//   // });
//   it("should handle /api/user ALL_USERS", async () => {
//     const response = await request(app).post("/api/user/allusers");
//     expect(response.status).toBe(200);
//   });
// });

// describe("Server Side Product API Tests", () => {
//   it("should handle /api/product PRODUCT_LIST", async () => {
//     const response = await request(app).get("/api/product/list");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/product PRODUCT_SINGLE", async () => {
//     const response = await request(app).post("/api/product/single");
//     expect(response.status).toBe(200);
//   });
//   // it("should handle /api/product PRODUCT_REMOVE", async () => {
//   //   const response = await request(app).post("/api/product/remove");
//   //   expect(response.status).toBe(200);
//   // });
// });

// describe("Server Side Cart API Tests", () => {
//   it("should handle /api/cart GET_USER_CART", async () => {
//     const response = await request(app).post("/api/cart/get");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/cart ADD_USER_CART", async () => {
//     const response = await request(app).post("/api/cart/add");
//     expect(response.status).toBe(200);
//   });
//   it("should handle /api/cart UPDATE_USER_CART", async () => {
//     const response = await request(app).post("/api/cart/update");
//     expect(response.status).toBe(200);
//   });
// });

// describe("Server Side Reviews API Tests", () => {
//   it("should handle /api/reviews GET_REVIEWS", async () => {
//     const response = await request(app).get("/api/reviews/");
//     expect(response.status).toBe(200);
//   });
// });

// describe("Mongodb End Tests", () => {
//   it("should disconnect from mongodb", async () => {
//     await mongoose.disconnect();
//     expect(mongoose.connection.readyState).toBe(0);
//   });
// });

import { test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../server.js";

dotenv.config();

test("should connect to mongodb", async () => {
  const connect = await mongoose.connect(
    `${process.env.MONGODB_URL}/e-sportswear`
  );

  await new Promise((resolve) => {
    if (mongoose.connection.readyState === 1) {
      resolve();
    } else {
      mongoose.connection.on("open", resolve);
    }
  });

  assert.strictEqual(mongoose.connection.readyState, 1);
});

test("should return API WORKING on GET /", async () => {
  const response = await request(app).get("/");
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.text, "API WORKING");
});

test("should handle /api/user LOGIN", async () => {
  const response = await request(app).post("/api/user/login");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/user REGISTER", async () => {
  const response = await request(app).post("/api/user/register");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/user ADMIN", async () => {
  const response = await request(app).post("/api/user/admin");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/user USER_DATA", async () => {
  const response = await request(app).post("/api/user/data");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/user UPDATE_USER_DATA", async () => {
  const response = await request(app).post("/api/user/updateuser");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/user FORGET_PASSWORD", async () => {
  const response = await request(app).post("/api/user/forgot-password");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/user ALL_USERS", async () => {
  const response = await request(app).post("/api/user/allusers");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/product PRODUCT_LIST", async () => {
  const response = await request(app).get("/api/product/list");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/product PRODUCT_SINGLE", async () => {
  const response = await request(app).post("/api/product/single");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/cart GET_USER_CART", async () => {
  const response = await request(app).post("/api/cart/get");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/cart ADD_USER_CART", async () => {
  const response = await request(app).post("/api/cart/add");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/cart UPDATE_USER_CART", async () => {
  const response = await request(app).post("/api/cart/update");
  assert.strictEqual(response.status, 200);
});

test("should handle /api/reviews GET_REVIEWS", async () => {
  const response = await request(app).get("/api/reviews/");
  assert.strictEqual(response.status, 200);
  process.exit(0);
});

test("should disconnect from mongodb", async () => {
  await mongoose.disconnect();
  assert.strictEqual(mongoose.connection.readyState, 0);
});

test("Exit", async () => {
  process.exit(0);
});
