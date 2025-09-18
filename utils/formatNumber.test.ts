import FormatNumber from "./formatNumber";
describe("FormatNumber utility", () => {
  it("formats thousands with commas", () => {
    expect(FormatNumber(1000)).toBe("1,000");
  });

  it("formats millions correctly", () => {
    expect(FormatNumber(1234567)).toBe("1,234,567");
  });

  it("returns number as string if small", () => {
    expect(FormatNumber(42)).toBe("42");
  });

  it("handles zero", () => {
    expect(FormatNumber(0)).toBe("0");
  });

  it("handles negative numbers", () => {
    expect(FormatNumber(-98765)).toBe("-98,765");
  });
});

