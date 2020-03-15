import jwt, { createToken } from "../../helpers/jwt";

const { JWT_SECRET_KEY } = process.env;
const payload = { id: 1, role: "Admin" };

describe("JWT", () => {
  it("should create new token", async () => {
    const encodedToken = await createToken(payload);
    const decodedToken = await jwt.verify(encodedToken, JWT_SECRET_KEY);
    expect(decodedToken).toMatchObject(payload);
  });

  it("should fail to create token on undefined payload", () => {
    return createToken().catch(error =>
      expect(error).toEqual(expect.objectContaining(/payload is required/))
    );
  });
});
