import generatePrettierRcFile from "../generatePrettierRcFile";

describe("generatePrettierRcFile", () => {
  it("should generate a correct .prettierrc file content with provided plugins", () => {
    const plugins = ["plugin1", "plugin2"];

    const result = generatePrettierRcFile({ plugins });

    expect(result.name).toBe(".prettierrc");
    expect(result.content).toBe(`{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 80,
    "plugins": ["plugin1","plugin2"]
  }
  `);
  });

  it("should generate a .prettierrc file with an empty plugins array if no plugins provided", () => {
    const result = generatePrettierRcFile({ plugins: [] });

    expect(result.name).toBe(".prettierrc");
    expect(result.content).toBe(`{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 80,
    "plugins": []
  }
  `);
  });
});
