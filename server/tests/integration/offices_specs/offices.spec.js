import "@babel/polyfill";
import request from "../../helpers/request";

const newOffice = {
  name: "FPR Inkotanyi",
  type: "Legislative"
};
let token;
let OfficeId;
describe("Office", () => {
  beforeAll(() => {
    return request
      .post("/api/v1/auth")
      .send({
        email: "admin@examle.com",
        password: "password"
      })
      .then(res => {
        token = res.body.data.token;
      });
  });
  test("should be created successfully", done => {
    return request
      .post("/api/v1/offices")
      .send(newOffice)
      .expect(201)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(Object.keys(newOffice))
        );
        expect(res.body.message).toMatch(/Office created successfully/);
        OfficeId = res.body.data.id;
        done();
      });
  });
  test("should not be created twice", done => {
    return request
      .post("/api/v1/offices")
      .send(newOffice)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(["name"])
        );
        expect(err.body.error.email).toEqual("name is already taken");
        done();
      });
  });
  test("should be validated", done => {
    return request
      .post("/api/v1/offices")
      .send({})
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error", "message"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(["name", "hqAddress", "logoUrl"])
        );
        expect(err.body.message).toMatch(/Validation error/);
        expect(err.body.error).toEqual(
          expect.objectContaining({
            name: "name is required",
            hqAddress: "hqAddress is required",
            logoUrl: "logoUrl is required"
          })
        );
        done();
      });
  });
  test("should be returned successfully", done => {
    return request
      .get(`/api/v1/offices/${OfficeId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(["id", ...Object.keys(newOffice)])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .get(`/api/v1/offices/12345`)
      .set("Authorization", `Bearer ${token}`)
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
      .get(`/api/v1/offices/${OfficeId}`)
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
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data[0])).toEqual(
          expect.arrayContaining(["id", ...Object.keys(newOffice)])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });
  test("should be updated successfully", done => {
    return request
      .put(`/api/v1/offices/${OfficeId}`)
      .send({ name: "another name" })
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(Object.keys(newOffice))
        );
        expect(res.body.data.name).toEqual("another name");
        expect(res.body.message).toMatch(/Office updated successfully/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .put(`/api/v1/offices/12345`)
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "another name" })
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

  test("should be deleted successfully", done => {
    return request
      .delete(`/api/v1/offices/${OfficeId}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(Object.keys(newOffice))
        );
        expect(res.body.message).toMatch(/Office deleted successfully/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .delete(`/api/v1/offices/12345`)
      .set("Authorization", `Bearer ${token}`)
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
});
