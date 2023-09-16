import generatePostCssProdConfigFile from "@generateTheme/cssOptions/postcss/generatePostCssProdConfigFile/generatePostCssProdConfigFile";
import { File } from "@utils/types/File";

describe("generatePostCssProdConfigFile", () => {
  it("should generate the correct PostCSS config file", () => {
    const expectedContent = `{
  "plugins": {
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-nested": {},
    "cssnano": {}
  }
}`;

    const expected: File = {
      name: ".postcssrc.prod.json",
      content: expectedContent,
    };

    const result = generatePostCssProdConfigFile();
    expect(result).toEqual(expected);
  });
});
