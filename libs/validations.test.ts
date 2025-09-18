import { loginSchema, signupSchema } from "./validations";
describe("Zod Schemas", () => {
  describe("loginSchema", () => {
    it("should pass with valid email and password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("should fail with invalid email", () => {
      const result = loginSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });

    it("should fail if password is too short", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "short",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must be at least 8 characters"
        );
      }
    });
  });

  describe("signupSchema", () => {
    it("should pass with valid name, email, and password", () => {
      const result = signupSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "mypassword123",
      });

      expect(result.success).toBe(true);
    });

    it("should fail if name is too short", () => {
      const result = signupSchema.safeParse({
        name: "J",
        email: "john@example.com",
        password: "mypassword123",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Name is required");
      }
    });

    it("should fail with invalid email", () => {
      const result = signupSchema.safeParse({
        name: "Jane Doe",
        email: "not-an-email",
        password: "mypassword123",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });

    it("should fail if password is too short", () => {
      const result = signupSchema.safeParse({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "123",
      });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must be at least 8 characters"
        );
      }
    });
  });
});
