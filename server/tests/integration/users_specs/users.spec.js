import "@babel/polyfill";
import request from "../../helpers/request";

const newUser = {
  firstname: "Mark",
  lastname: "Zuckerberg",
  othername: "Facebook",
  email: "facebook@example.com",
  phoneNumber: "250774145152",
  nationalId: "12145678912",
  passportUrl: "https://avatar.png",
  password: "password",
  isAdmin: false
};
let token;
let userId;
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
        token = res.body.data.token;
        userId = res.body.data.user.id;
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
  test("should be returned successfully", done => {
    return request
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining([
            "id",
            "firstname",
            "lastname",
            "othername",
            "email",
            "phonenumber",
            "passporturl",
            "nationalid"
          ])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .get(`/api/v1/users/12345`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/User not found/);
        done();
      });
  });

  test("should return badRequest for not integers id", done => {
    return request
      .get(`/api/v1/users/notinteger`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(
          /invalid input syntax for type integer/
        );
        done();
      });
  });

  test("should return unauthorized", done => {
    return request
      .get(`/api/v1/users/${userId}`)
      .expect(401)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(
          /Unauthorized to perform this action/
        );
        done();
      });
  });
});
