import dbErrors from "../../helpers/dbErrors";

const errorsUnique = [
  {
    path: "email",
    message: "Unique constraint violation",
    type: "unique violation"
  }
];
const errorUndefined = [
  {
    path: "password",
    message: "Cant generate hash for nil value",
    type: "SOME_THING_ELSE"
  }
];
describe("Database Error", () => {
  test("should return unique validation error", () => {
    const response = dbErrors({ errors: errorsUnique });
    expect(response).toEqual(
      expect.objectContaining({ email: "email is already taken" })
    );
  });

  test("should return other db error", () => {
    const response = dbErrors({ errors: errorUndefined });
    expect(response).toEqual(
      expect.objectContaining({ password: "Cant generate hash for nil value" })
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
