import "@babel/polyfill";
import request from "../../helpers/request";

const newparty = {
  name: "FPR Inkotanyi",
  logoUrl: "https://logo.png",
  hqAddress: "Remera/Kigali"
};
let token;
let partyId;
describe("party", () => {
  test("should be created successfully", done => {
    return request
      .post("/api/v1/parties")
      .send(newparty)
      .expect(201)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(Object.keys(newparty))
        );
        expect(res.body.message).toMatch(/Party created successfully/);
        partyId = res.body.data.id;
        done();
      });
  });
  test("should not be created twice", done => {
    return request
      .post("/api/v1/parties")
      .send(newparty)
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
      .post("/api/v1/parties")
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
      .get(`/api/v1/parties/${partyId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data)).toEqual(
          expect.arrayContaining(["id", ...Object.keys(newparty)])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });
  test("should not be found", done => {
    return request
      .get(`/api/v1/parties/12345`)
      .set("Authorization", `Bearer ${token}`)
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
  test("should return all parties successfully", done => {
    return request
      .get(`/api/v1/parties`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(["status", "data"])
        );
        expect(Object.keys(res.body.data[0])).toEqual(
          expect.arrayContaining(["id", ...Object.keys(newparty)])
        );
        expect(res.body.message).toMatch(/Success/);
        done();
      });
  });
});
