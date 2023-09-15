import generatePostCssConfigFile from "@generateTheme/cssOptions/postcss/generatePostCssConfigFile/generatePostCssConfigFile";
import { File } from "@utils/types/File";

describe("generatePostCssConfigFile", () => {
  it("should return a File object with correct name and content", () => {
    const result: File = generatePostCssConfigFile();

    expect(result.name).toEqual("postcss.config.ts");

    expect(result.content).toContain("import autoprefixer from 'autoprefixer'");
    expect(result.content).toContain("import nested from 'postcss-nested'");
    expect(result.content).toContain("import cssnano from 'cssnano'");
    expect(result.content).toContain("autoprefixer,");
    expect(result.content).toContain("nested,");
    expect(result.content).toContain("cssnano");
  });
});
