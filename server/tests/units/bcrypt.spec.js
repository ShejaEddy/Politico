import bcrypt from "../../helpers/bcrypt";

let hashedPassword;
describe("Bcrypt", () => {
  it("should generate an encrypted password", async () => {
    hashedPassword = await bcrypt.hashPassword("password");
    expect(hashedPassword).not.toMatch(/password/);
  });

  it("should compare password and return true", async () => {
    const ok = await bcrypt.comparePassword(hashedPassword, "password");
    expect(ok).toBeTruthy();
  });

  it("should compare password and return false", async () => {
    const ok = await bcrypt.comparePassword(hashedPassword, "hghfffyfy");
    expect(ok).toBeFalsy();
  });
});
