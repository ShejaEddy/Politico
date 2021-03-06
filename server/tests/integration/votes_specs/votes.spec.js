import "@babel/polyfill";
import request from "../../helpers/request";

const newVote = {
  candidate: 1,
  office: 1
};
let token;

describe("Votes Controllers", () => {
  beforeAll(done => {
    return request
      .post("/api/v1/auth")
      .send({
        email: "user@example.com",
        password: "password"
      })
      .then(res => {
        token = res.body.data.token;
        done();
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
          expect(err.body.message).toEqual(
            "Vote can not be casted to the same office twice"
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
            expect.arrayContaining(["candidate", "office"])
          );
          expect(err.body.message).toMatch(/Validation error/);
          expect(err.body.error).toEqual(
            expect.objectContaining({
              candidate: "candidate is required",
              office: "office is required"
            })
          );
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
  describe("Get all votes per office", () => {
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

    test("should not find office", done => {
      return request
        .get(`/api/v1/votes/12345`)
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
    test("should return badRequest for not integers id", done => {
      return request
        .get(`/api/v1/votes/notinteger`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(/invalid input syntax/);
          done();
        });
    });

    test("should return badRequest for not ready results", async done => {
      let officeId;
      let adminToken;
      await request
        .post("/api/v1/auth")
        .send({ email: "admin@example.com", password: "password" })
        .expect(200)
        .then(res => {
          adminToken = res.body.data.token;
        });
      await request
        .post("/api/v1/offices")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(201)
        .send({
          name: "Test Office",
          type: "Legislative"
        })
        .then(res => {
          officeId = res.body.data.id;
        });
      await request
        .get(`/api/v1/votes/${officeId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .then(err => {
          expect(Object.keys(err.body)).toEqual(
            expect.arrayContaining(["status", "error"])
          );
          expect(err.body.error.message).toMatch(
            /Unfortunately, no results are available at the moment/
          );
          done();
        });
    });
  });
  describe("Get all votes", () => {
    test("should return all votes successfully", done => {
      return request
        .get(`/api/v1/votes`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["status", "data"])
          );
          expect(Object.keys(res.body.data.results[0])).toEqual(
            expect.arrayContaining(["result", "candidate", "office"])
          );
          expect(res.body.message).toMatch(/Success/);
          done();
        });
    });
  });
});
