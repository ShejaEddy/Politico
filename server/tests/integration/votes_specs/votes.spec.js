import "@babel/polyfill";
import request from "../../helpers/request";

const newVote = {
  candidate: 1,
  office: 1,
  voter: 1
};
let token;

describe("Votes Controllers", () => {
  beforeAll(() => {
    return request
      .post("/api/v1/auth")
      .send({
        email: "user@example.com",
        password: "password"
      })
      .then(res => {
        token = res.body.data.token;
      });
  });
  describe("Cast a vote", () => {
    test("should be created successfully", done => {
      return request
        .post("/api/v1/votes")
        .set("Authorization", `Bearer ${token}`)
        .send(newVote)
        .expect(201)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data)).toEqual(
            expect.arrayContaining(Object.keys(newVote))
          );
          expect(res.body.message).toMatch(/Vote casted successfully/);
          done();
        });
    });
    test("should not be created twice", done => {
      return request
        .post("/api/v1/votes")
        .set("Authorization", `Bearer ${token}`)
        .send(newVote)
        .expect(400)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(Object.keys(err.body.error)).toEqual(
            expect.arrayContaining(["office, voter"])
          );
          expect(err.body.error["office, voter"]).toEqual(
            "office, voter is already taken"
          );
          done();
        });
    });
    test("should be validated", done => {
      return request
        .post("/api/v1/votes")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(400)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error", "message"])
          );
          expect(Object.keys(err.body.error)).toEqual(
            expect.arrayContaining(["candidate", "office", "voter"])
          );
          expect(err.body.message).toMatch(/Validation error/);
          expect(err.body.error).toEqual(
            expect.objectContaining({
              candidate: "candidate is required",
              office: "office is required",
              voter: "voter is required"
            })
          );
          done();
        });
    });
    test("should not find office", done => {
      return request
        .post(`/api/v1/votes`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newVote, office: 1234 })
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Office not found/);
          done();
        });
    });
    test("should not find voter", done => {
      return request
        .post(`/api/v1/votes`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newVote, voter: 1234 })
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Voter not found/);
          done();
        });
    });
    test("should not find candidate", done => {
      return request
        .post(`/api/v1/votes`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newVote, candidate: 1234 })
        .expect(404)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/Candidate not found/);
          done();
        });
    });

    test("should return unauthorized", done => {
      return request
        .post(`/api/v1/votes`)
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
  describe("Get all votes", () => {
    test("should return all votes successfully", done => {
      return request
        .get(`/api/v1/votes/1`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data)).toEqual(
            expect.arrayContaining(["result", "candidate", "office"])
          );
          expect(res.body.message).toMatch(/Success/);
          done();
        });
    });
  });
});
