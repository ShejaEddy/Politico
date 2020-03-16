import "@babel/polyfill";
import request from "../../helpers/request";

const newparty = {
  name: "FPR Inkotanyi",
  logoUrl: "https://logo.png",
  hqAddress: "Remera/Kigali"
};
const attributes = ["name", "logourl", "hqaddress"];
let adminToken;
let userToken;
let partyId;
describe("Part Controllers", () => {
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
  describe("Create party", () => {
    test("should be created successfully", done => {
      return request
        .post("/api/v1/parties")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newparty)
        .expect(201)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data)).toEqual(
            expect.arrayContaining(attributes)
          );
          expect(res.body.message).toMatch(/Party created successfully/);
          partyId = res.body.data.id;
          done();
        });
    });
    test("should not be created twice", done => {
      return request
        .post("/api/v1/parties")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newparty)
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
        .post(`/api/v1/parties`)
        .set("Authorization", `Bearer ${userToken}`)
        .send(newparty)
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
        .post("/api/v1/parties")
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
              hqAddress: "hqAddress is required",
              logoUrl: "logoUrl is required"
            })
          );
          done();
        });
    });
  });
  describe("Get a party", () => {
    test("should be returned successfully", done => {
      return request
        .get(`/api/v1/parties/${partyId}`)
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
        .get(`/api/v1/parties/12345`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Party not found/);
          done();
        });
    });
    test("should return badRequest for not integers id", done => {
      return request
        .get(`/api/v1/parties/notinteger`)
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
        .get(`/api/v1/parties/${partyId}`)
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
  describe("Get all parties", () => {
    test("should return all parties successfully", done => {
      return request
        .get(`/api/v1/parties`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data.parties[0])).toEqual(
            expect.arrayContaining(["id", ...attributes])
          );
          expect(res.body.message).toMatch(/Success/);
          done();
        });
    });
  });

  describe("Update party", () => {
    test("should be updated successfully", done => {
      return request
        .put(`/api/v1/parties/${partyId}`)
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
          expect(res.body.message).toMatch(/Party updated successfully/);
          done();
        });
    });
    test("should not be found", done => {
      return request
        .put(`/api/v1/parties/12345`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "another name" })
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Party not found/);
          done();
        });
    });

    test("should return badRequest for not integers id", done => {
      return request
        .put(`/api/v1/parties/notinteger`)
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
  });
  describe("Delete a party", () => {
    test("should be deleted successfully", done => {
      return request
        .delete(`/api/v1/parties/${partyId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "message"])
          );
          expect(res.body.message).toMatch(/Party deleted successfully/);
          done();
        });
    });
    test("should not be found", done => {
      return request
        .delete(`/api/v1/parties/12345`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Party not found/);
          done();
        });
    });

    test("should return badRequest for not integers id", done => {
      return request
        .delete(`/api/v1/parties/notinteger`)
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
});
