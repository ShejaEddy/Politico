import "@babel/polyfill";
import request from "../../helpers/request";

const newCandidate = {
  candidate: 1,
  office: 1,
  party: 1
};
let token;
describe("party", () => {
  beforeAll(() => {
    return request
      .post("/api/v1/auth")
      .send({
        email: "admin@example.com",
        password: "password"
      })
      .then(res => {
        token = res.body.data.token;
      });
  });
  test("should be created successfully", done => {
    return request
      .post("/api/v1/offices/candidates")
      .send(newCandidate)
      .expect(201)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(Object.keys(newCandidate))
        );
        expect(res.body.message).toMatch(/Candidate created successfully/);
        done();
      });
  });
  test("should not be created twice", done => {
    return request
      .post("/api/v1/offices/candidates")
      .send(newCandidate)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(["candidate"])
        );
        expect(err.body.error.email).toEqual("candidate is already taken");
        done();
      });
  });
  test("should be validated", done => {
    return request
      .post("/api/v1/offices/candidates")
      .send({})
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error", "message"])
        );
        expect(Object.keys(err.body.error)).toEqual(
          expect.arrayContaining(["candidate", "office", "party"])
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
  test("should not find office", done => {
    return request
      .post(`/api/v1/offices/candidates`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newCandidate, office: 1234 })
      .expect(404)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/Office not found/);
        done();
      });
  });
  test("should not find party", done => {
    return request
      .post(`/api/v1/offices/candidates`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newCandidate, party: 1234 })
      .expect(404)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.error.message).toMatch(/Party not found/);
        done();
      });
  });
  test("should not find user", done => {
    return request
      .post(`/api/v1/offices/candidates`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newCandidate, candidate: 1234 })
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
      .post(`/api/v1/offices/candidates`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newCandidate, candidate: "notinteger" })
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
      .post(`/api/v1/offices/candidates`)
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
