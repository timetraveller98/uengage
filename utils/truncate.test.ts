import { truncateLetters } from "./truncate";

describe("truncate utility", () => {
  it("should truncate long text", () => {
    expect(truncateLetters("Hello World", 5)).toBe("Hello...");
  });

  it("should return same text if short enough", () => {
    expect(truncateLetters("Hi", 5)).toBe("Hi");
  });
});
