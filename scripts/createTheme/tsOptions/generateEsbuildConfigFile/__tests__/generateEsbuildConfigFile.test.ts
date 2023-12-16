import generateEsbuildConfigFile from "../generateEsbuildConfigFile";

describe("generateEsbuildConfigFile", () => {
  it("should always produce an esbuild config file named esbuild.config.ts", () => {
    const themeFolder = "sampleTheme";
    const result = generateEsbuildConfigFile({ themeFolder });

    expect(result.name).toBe("esbuild.config.ts");
  });

  it("should insert the themeFolder into the correct location in the file content", () => {
    const themeFolder = "sampleTheme";
    const result = generateEsbuildConfigFile({ themeFolder });

    expect(result.content).toContain(`wp/themes/${themeFolder}/js`);
  });
});
