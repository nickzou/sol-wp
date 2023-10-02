import generateJsFile from "../generateJsFile";

describe("generateJsFile", () => {
  it("should generate a correct ts file content", () => {
    const themeName = "dark";

    const result = generateJsFile({ themeName });

    expect(result.name).toBe("index.js");
    expect(result.content).toBe(`console.log("hello dark");`);
  });

  it("should insert the themeName correctly into the content", () => {
    const themeName = "light";

    const result = generateJsFile({ themeName });

    expect(result.content).toBe(`console.log("hello light");`);
  });
});
