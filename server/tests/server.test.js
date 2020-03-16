import request from "./helpers/request";

describe("Initial test", () => {
  test("should be true", () => {
    expect(5 + 5).toEqual(10);
  });
  test("should welcome users", () => {
    return request
      .get("/")
      .expect(200)
      .then(res =>
        expect(res.body.message).toEqual("Welcome to Politico API V1 Gateway")
      );
  });
  test("should return not found for unknown routes", () => {
    return request
      .get("/nowhere")
      .expect(404)
      .then(res =>
        expect(res.body.error.message).toEqual("This page does not exist!")
      );
  });
});
