import "@babel/polyfill";
import request from "../../helpers/request";

const adminData = { email: "admin@example.com", password: "password" };

describe("Authentication Controller", () => {
  describe("Failing Authentication", () => {
    test("should return auth error", () => {
      return request
        .post("/api/v1/auth")
        .send({
          email: "wrong@email.com",
          password: "wrongpassword"
        })
        .expect(400)
        .then(err => {
          const { error } = err.body;
          expect(error).toEqual(
            expect.objectContaining({ message: "Invalid Email/Password" })
          );
        });
    });
    test("should return auth error on wrong password", () => {
      return request
        .post("/api/v1/auth")
        .send({
          ...adminData,
          password: "wrongpassword"
        })
        .expect(400)
        .then(err => {
          const { error } = err.body;
          expect(error).toEqual(
            expect.objectContaining({ message: "Invalid Email/Password" })
          );
        });
    });
    test("should return validation error", () => {
      return request
        .post("/api/v1/auth")
        .send({})
        .expect(400)
        .then(err => {
          const { error } = err.body;
          expect(error).toEqual(
            expect.objectContaining({
              email: "email is required",
              password: "password is required"
            })
          );
        });
    });
  });

  describe("Authentication Success", () => {
    test("should return auth success: user", () => {
      return request
        .post("/api/v1/auth")
        .send(adminData)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data)).toEqual(
            expect.arrayContaining(["user", "token"])
          );
        });
    });
  });
});
