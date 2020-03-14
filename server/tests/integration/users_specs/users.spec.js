import "@babel/polyfill";
import request from "../../helpers/request";

const newUser = {
  firstname: "Mark",
  lastname: "Zuckerberg",
  othername: "Facebook",
  email: "user@example.com",
  phoneNumber: "250784145652",
  nationalId: "12345678911",
  passportUrl: "https://avatar.png",
  password: "password",
  isAdmin: false
};

describe("User", () => {
  test("should be created successfully", done => {
    return request
      .post("/api/v1/users")
      .send(newUser)
      .expect(201)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(["user", "token"])
        );
        expect(res.body.message).toMatch(/User created successfully/);
        done();
      });
  });
  test("should not be created twice", done => {
    return request
      .post("/api/v1/users")
      .send(newUser)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(["email"])
        );
        expect(err.body.error.email).toEqual("email is already taken");
        done();
      });
  });
  test("should be validated", done => {
    return request
      .post("/api/v1/users")
      .send({})
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error", "message"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining([
            "firstname",
            "lastname",
            "email",
            "phoneNumber",
            "nationalId",
            "password",
            "isAdmin"
          ])
        );
        expect(err.body.message).toMatch(/Validation error/);
        expect(err.body.error).toEqual(
          expect.objectContaining({
            email: "email is required",
            password: "password is required",
            firstname: "firstname is required"
          })
        );
        done();
      });
  });
});
