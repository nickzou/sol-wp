import replaceSpacesAndToLowercase from "@utils/formatFolderName/formatFolderName";

describe("replaceSpacesAndToLowercase", () => {
  it("should replace spaces with dashes and convert uppercase to lowercase", () => {
    expect(replaceSpacesAndToLowercase("Hello World")).toBe("hello-world");
    expect(replaceSpacesAndToLowercase("HELLO")).toBe("hello");
    expect(replaceSpacesAndToLowercase(" hElLo WoRlD ")).toBe("hello-world");
  });

  it("should handle empty strings", () => {
    expect(replaceSpacesAndToLowercase("")).toBe("");
  });

  it("should handle strings without spaces or uppercase letters", () => {
    expect(replaceSpacesAndToLowercase("hello")).toBe("hello");
  });
});
