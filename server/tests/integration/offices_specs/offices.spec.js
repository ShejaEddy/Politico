import "@babel/polyfill";
import request from "../../helpers/request";

const newOffice = {
  name: "FPR Inkotanyi",
  type: "Legislative"
};
const attributes = ["name", "type"];
let adminToken;
let userToken;
let officeId;

describe("Office", () => {
  beforeAll(async done => {
    await request
      .post("/api/v1/auth")
      .send({ email: "admin@example.com", password: "password" })
      .then(res => {
        adminToken = res.body.data.token;
      });
    await request
      .post("/api/v1/auth")
      .send({
        email: "user@example.com",
        password: "password"
      })
      .then(res => {
        userToken = res.body.data.token;
        done();
      });
  });
  test("should be created successfully", done => {
    return request
      .post("/api/v1/offices")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newOffice)
      .expect(201)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(attributes)
        );
        expect(res.body.message).toMatch(/Office created successfully/);
        officeId = res.body.data.id;
        done();
      });
  });
  test("should not be created twice", done => {
    return request
      .post("/api/v1/offices")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newOffice)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(["name"])
        );
        expect(err.body.error.name).toEqual("name is already taken");
        done();
      });
  });
  test("should not be created by users other than admin", done => {
    return request
      .post(`/api/v1/offices`)
      .set("Authorization", `Bearer ${userToken}`)
      .send(newOffice)
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
  test("should be validated", done => {
    return request
      .post("/api/v1/offices")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({})
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error", "message"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(attributes)
        );
        expect(err.body.message).toMatch(/Validation error/);
        expect(err.body.error).toEqual(
          expect.objectContaining({
            name: "name is required",
            type: "type is required"
          })
        );
        done();
      });
  });
  test("should be returned successfully", done => {
    return request
      .get(`/api/v1/offices/${officeId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(["id", ...attributes])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .get(`/api/v1/offices/12345`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(404)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/Office not found/);
        done();
      });
  });

  test("should return badRequest for not integers id", done => {
    return request
      .get(`/api/v1/offices/notinteger`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/invalid input syntax/);
        done();
      });
  });

  test("should return unauthorized", done => {
    return request
      .get(`/api/v1/offices/${officeId}`)
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
  test("should return all offices successfully", done => {
    return request
      .get(`/api/v1/offices`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data.offices[0])).toEqual(
          expect.arrayContaining(["id", ...attributes])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });

  test("should be updated successfully", done => {
    return request
      .put(`/api/v1/offices/${officeId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "another name" })
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(attributes)
        );
        expect(res.body.data.name).toEqual("another name");
        expect(res.body.message).toMatch(/Office updated successfully/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .put(`/api/v1/offices/12345`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "another name" })
      .expect(404)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/Office not found/);
        done();
      });
  });

  test("should return badRequest for not integers id", done => {
    return request
      .put(`/api/v1/offices/notinteger`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "another name" })
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/invalid input syntax/);
        done();
      });
  });

  test("should be deleted successfully", done => {
    return request
      .delete(`/api/v1/offices/${officeId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "message"])
        );
        expect(res.body.message).toMatch(/Office deleted successfully/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .delete(`/api/v1/offices/12345`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(404)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/Office not found/);
        done();
      });
  });

  test("should return badRequest for not integers id", done => {
    return request
      .delete(`/api/v1/offices/notinteger`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/invalid input syntax/);
        done();
      });
  });
});
