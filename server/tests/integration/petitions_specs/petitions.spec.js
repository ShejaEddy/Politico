import "@babel/polyfill";
import request from "../../helpers/request";

const newpetition = {
  office: 1,
  body: "Please help me",
  evidence: ["https://secrets.com"]
};
const attributes = ["office", "body", "createdby", "evidence"];
let adminToken;
let userToken;
let petitionId;
describe("Petition Controllers", () => {
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
  describe("Create petition", () => {
    test("should be created successfully", done => {
      return request
        .post("/api/v1/petitions")
        .set("Authorization", `Bearer ${userToken}`)
        .send(newpetition)
        .expect(201)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data)).toEqual(
            expect.arrayContaining(attributes)
          );
          expect(res.body.message).toMatch(/Petition created successfully/);
          petitionId = res.body.data.id;
          done();
        });
    });

    test("should not be created and throw baqRequest", done => {
      return request
        .post("/api/v1/petitions")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ ...newpetition, evidence: "badRequest"})
        .expect(400)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(res.body.error.evidence).toMatch(/evidence must be an array/);
          done();
        });
    });

    test("should be validated", done => {
      return request
        .post("/api/v1/petitions")
        .set("Authorization", `Bearer ${userToken}`)
        .send({})
        .expect(400)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error", "message"])
          );
          expect(Object.keys(err.body.error)).toEqual(
            expect.arrayContaining(Object.keys(newpetition))
          );
          expect(err.body.message).toMatch(/Validation error/);
          expect(err.body.error).toEqual(
            expect.objectContaining({
              body: "body is required",
              evidence: "evidence is required"
            })
          );
          done();
        });
    });
  });
  describe("Get a petition", () => {
    test("should be returned successfully", done => {
      return request
        .get(`/api/v1/petitions/${petitionId}`)
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
        .get(`/api/v1/petitions/12345`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Petition not found/);
          done();
        });
    });
    test("should return badRequest for not integers id", done => {
      return request
        .get(`/api/v1/petitions/notinteger`)
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
        .get(`/api/v1/petitions/${petitionId}`)
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
  describe("Get petitions", () => {
    test("should return all petitions successfully", done => {
      return request
        .get(`/api/v1/petitions`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data.petitions[0])).toEqual(
            expect.arrayContaining(["id", ...attributes])
          );
          expect(res.body.message).toMatch(/Success/);
          done();
        });
    });
    test("should return unauthorized", done => {
      return request
        .get(`/api/v1/petitions`)
        .set("Authorization", `Bearer ${userToken}`)
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
    test("should return all user petitions successfully", done => {
      return request
        .get(`/api/v1/petitions/current`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data.petitions[0])).toEqual(
            expect.arrayContaining(["id", ...attributes])
          );
          expect(res.body.message).toMatch(/Success/);
          done();
        });
    });
  });

  describe("Update petition", () => {
    test("should be updated successfully", done => {
      return request
        .put(`/api/v1/petitions/${petitionId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ body: "another matter" })
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data)).toEqual(
            expect.arrayContaining(attributes)
          );
          expect(res.body.data.body).toEqual("another matter");
          expect(res.body.message).toMatch(/Petition updated successfully/);
          done();
        });
    });
    test("should not be found", done => {
      return request
        .put(`/api/v1/petitions/12345`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ body: "another body" })
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Petition not found/);
          done();
        });
    });

    test("should return badRequest for not integers id", done => {
      return request
        .put(`/api/v1/petitions/notinteger`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ body: "another body" })
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
  describe("Delete a petition", () => {
    test("should be deleted successfully", done => {
      return request
        .delete(`/api/v1/petitions/${petitionId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "message"])
          );
          expect(res.body.message).toMatch(/Petition deleted successfully/);
          done();
        });
    });
    test("should not be found", done => {
      return request
        .delete(`/api/v1/petitions/12345`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Petition not found/);
          done();
        });
    });

    test("should return badRequest for not integers id", done => {
      return request
        .delete(`/api/v1/petitions/notinteger`)
        .set("Authorization", `Bearer ${userToken}`)
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
});
