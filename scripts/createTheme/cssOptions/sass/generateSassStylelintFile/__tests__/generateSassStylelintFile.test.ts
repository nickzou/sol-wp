import generateSassStylelintFile from "@createTheme/cssOptions/sass/generateSassStylelintFile/generateSassStylelintFile";

describe("generateSassStylelintFile", () => {
  it("should return the correct File object", () => {
    const expectedFile = {
      name: ".stylelintrc.json",
      content: `{
  "extends": ["stylelint-config-standard-scss"]
}`,
    };

    const generatedFile = generateSassStylelintFile();

    expect(generatedFile).toEqual(expectedFile);
  });
});
