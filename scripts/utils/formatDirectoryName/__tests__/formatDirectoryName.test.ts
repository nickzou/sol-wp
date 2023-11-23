import formatDirectoryName from "@utils/formatDirectoryName/formatDirectoryName";

describe("formatDirectoryName", () => {
  it("should replace spaces with dashes and convert uppercase to lowercase", () => {
    expect(formatDirectoryName("Hello World")).toBe("hello-world");
    expect(formatDirectoryName("HELLO")).toBe("hello");
    expect(formatDirectoryName(" hElLo WoRlD ")).toBe("hello-world");
  });

  it("should handle empty strings", () => {
    expect(formatDirectoryName("")).toBe("");
  });

  it("should handle strings without spaces or uppercase letters", () => {
    expect(formatDirectoryName("hello")).toBe("hello");
  });
});
