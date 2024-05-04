// const request = require("supertest");
// import { test } from "jest";
import request from "supertest";

// const app = require("./app");
import app from "./app.js";

describe("POST /api/auth/signup", () => {
  test("should create a new user", async () => {
    const newUser = { name: "TestUser" };
    const response = await request(app).post("/api/auth/signup").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("email", newUser.email);
  });

  test("should return 400 if email is missing", async () => {
    const response = await request(app).post("/api/auth/signup").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Email is required");
  });
});

describe("POST /api/contact/create", () => {
  test("should create a new contact", async () => {
    const newContact = { name: "John Doe", email: "john@example.com" };
    const response = await request(app)
      .post("/api/contact/create")
      .send(newContact);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newContact);
  });
});

describe("PUT /api/contact/update/:id", () => {
  test("should update an existing contact", async () => {
    const updatedContact = { name: "Jane Doe", email: "jane@example.com" };
    const response = await request(app)
      .put("/api/contact/update/1")
      .send(updatedContact);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedContact);
  });

  test("should return 404 if contact does not exist", async () => {
    const updatedContact = { name: "Jane Doe", email: "jane@example.com" };
    const response = await request(app)
      .put("/api/contact/update/999")
      .send(updatedContact);
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ error: "Contact not found" });
  });
});
