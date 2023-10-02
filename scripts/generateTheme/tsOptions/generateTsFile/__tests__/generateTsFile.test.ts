import generateTsFile from "../generateTsFile";

describe("generateTsFile", () => {
  it("should generate a correct ts file content", () => {
    const themeName = "dark";

    const result = generateTsFile({ themeName });

    expect(result.name).toBe("index.ts");
    expect(result.content).toBe(`console.log('hello dark');`);
  });

  it("should insert the themeName correctly into the content", () => {
    const themeName = "light";

    const result = generateTsFile({ themeName });

    expect(result.content).toBe(`console.log('hello light');`);
  });
});
