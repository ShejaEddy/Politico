import dbErrors from "../../helpers/dbErrors";

const errorsUnique = {
  detail: "Key (email) (shejaeddy@gmail.com) already exists.",
  code: "23505"
};
const errorUndefined = {
  detail: "Key (email) can not be null",
  code: "SOME_OTHER_CODES",
  message: "violated not null constraint"
};
describe("Database Error", () => {
  test("should return unique validation error", () => {
    const response = dbErrors(errorsUnique);
    expect(response).toEqual(
      expect.objectContaining({ email: "email is already taken" })
    );
  });

  test("should return other db error", () => {
    const response = dbErrors(errorUndefined);
    expect(response).toEqual(
      expect.objectContaining({ email: "violated not null constraint" })
    );
  });

  test("should return bad request error", () => {
    const response = dbErrors(() => {
      throw new Error();
    });
    expect(response).toEqual(
      expect.objectContaining({ message: "Bad request" })
    );
  });
});
