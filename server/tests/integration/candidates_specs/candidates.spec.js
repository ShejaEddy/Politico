import "@babel/polyfill";
import request from "../../helpers/request";

const newCandidate = {
  candidate: 2,
  office: 1,
  party: 1
};
let token;
describe("Candidate controllers", () => {
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
      .post("/api/v1/candidates")
      .set("Authorization", `Bearer ${token}`)
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
      .post("/api/v1/candidates")
      .set("Authorization", `Bearer ${token}`)
      .send(newCandidate)
      .expect(400)
      .then(err => {
        expect(Object.keys(err.body)).toEqual(
          expect.arrayContaining(["status", "error"])
        );
        expect(err.body.message).toEqual("Candidate already exists");
        done();
      });
  });
  test("should be validated", done => {
    return request
      .post("/api/v1/candidates")
      .set("Authorization", `Bearer ${token}`)
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
            candidate: "candidate is required",
            office: "office is required",
            party: "party is required"
          })
        );
        done();
      });
  });
  test("should not find office", done => {
    return request
      .post(`/api/v1/candidates`)
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
      .post(`/api/v1/candidates`)
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
      .post(`/api/v1/candidates`)
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

  test("should return unauthorized", done => {
    return request
      .post(`/api/v1/candidates`)
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

  describe("Get all candidates", () => {
    test("should return all candidates successfully", done => {
      return request
        .get(`/api/v1/candidates`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data.candidates[0])).toEqual(
            expect.arrayContaining(["id", "candidate", "office", "party"])
          );
          expect(res.body.message).toMatch(/Success/);
          done();
        });
    });
  });
});
