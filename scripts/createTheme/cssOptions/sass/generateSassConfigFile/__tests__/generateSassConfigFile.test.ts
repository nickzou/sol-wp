import generateSassConfigFile from "createTheme/cssOptions/sass/generateSassConfigFile/generateSassConfigFile";
import { File } from "@utils/types/File"; // Adjust the import path

describe("generateSassConfigFile", () => {
  it("should return a File object with the correct name and content", () => {
    const themeFolder = "my-theme";
    const result: File = generateSassConfigFile({ themeFolder });

    expect(result.name).toEqual("sass.config.ts");

    // Check for essential code segments
    expect(result.content).toContain('import * as sass from "sass"');
    expect(result.content).toContain('import glob from "glob"');
    expect(result.content).toContain(
      "const files = glob.sync(`./src/css/**/*.scss`)"
    );
    expect(result.content).toContain("const outputDir = `wp/themes/");

    // Check if themeFolder is correctly embedded
    expect(result.content).toContain(
      `const outputDir = \`wp/themes/${themeFolder}/css\`;`
    );
  });
});
