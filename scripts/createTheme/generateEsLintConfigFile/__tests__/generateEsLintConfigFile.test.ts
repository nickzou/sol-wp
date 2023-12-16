import generateEsLintConfigFile from "../generateEsLintConfigFile";

describe("generateEsLintConfigFile", () => {
  it("should generate a correct .eslintrc.json file content with provided parameters", () => {
    const extendsArr = ["plugin:react/recommended"];
    const plugins = ["react"];
    const parser = "babel-eslint";

    const result = generateEsLintConfigFile({ extendsArr, plugins, parser });

    expect(result.name).toBe(".eslintrc.json");
    expect(result.content).toContain(
      '"extends": ["eslint:recommended","prettier","plugin:react/recommended"]'
    );
    expect(result.content).toContain('"plugins": ["prettier","react"]');
    expect(result.content).toContain('"parser": "babel-eslint"');
  });

  it("should generate a .eslintrc.json file with default values if optional parameters are not provided", () => {
    const parser = "babel-eslint";
    const result = generateEsLintConfigFile({ parser });

    expect(result.name).toBe(".eslintrc.json");
    expect(result.content).toContain(
      '"extends": ["eslint:recommended","prettier"]'
    );
    expect(result.content).toContain('"plugins": ["prettier"]');
  });

  it("should not include the parser key if the parser parameter is not provided", () => {
    const result = generateEsLintConfigFile({ parser: "" });

    expect(result.name).toBe(".eslintrc.json");
    expect(result.content).not.toContain('"parser":');
  });
});
