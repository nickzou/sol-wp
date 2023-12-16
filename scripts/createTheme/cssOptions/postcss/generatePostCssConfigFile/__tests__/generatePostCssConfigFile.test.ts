import generatePostCssConfigFile from "createTheme/cssOptions/postcss/generatePostCssConfigFile/generatePostCssConfigFile";
import { File } from "@utils/types/File";

describe("generatePostCssConfigFile", () => {
  it("should generate the correct PostCSS config file", () => {
    const expectedContent = `{
  "plugins": {
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-nested": {}
  }
}`;

    const expected: File = {
      name: ".postcssrc.json",
      content: expectedContent,
    };

    const result = generatePostCssConfigFile();
    expect(result).toEqual(expected);
  });
});
