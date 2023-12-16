import generateTsConfigFile from "createTheme/tsOptions/generateTsConfigFile/generateTsConfigFile";
import { File } from "@utils/types/File";

describe("generateTsConfigFile", () => {
  it("should generate the correct tsconfig.json file", () => {
    const expectedContent = `{
  "compilerOptions": {
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames":true,
    "skipLibCheck":true,
    "target": "ES6",
    "verbatimModuleSyntax":true,
    "allowJs":true,
    "resolveJsonModule":true,
    "moduleDetection":"force",
    "strict":true,
    "noUncheckedIndexedAccess":true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noEmit": true,
    "lib":["es2022","dom"],
  }
}`;

    const expected: File = {
      name: "tsconfig.json",
      content: expectedContent,
    };

    const result = generateTsConfigFile();
    expect(result).toEqual(expected);
  });
});
