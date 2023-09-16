import generateEsLintConfigFile from "@generateTheme/generateEsLintConfigFile/generateEsLintConfigFile";
import { File } from "@utils/types/File";

describe("generateEsLintConfigFile", () => {
  it("should generate the correct tsconfig.json file", () => {
    const expectedContent = `{
  "extends": "eslint:recommended",
  "plugins": [
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "ignoredNodes": ["TemplateLiteral *", "ConditionalExpression"],
        "SwitchCase": 1
      }
    ],
    "linebreak-style": ["error", "unix"],
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "semi": ["error", "always"],
    "prefer-template": 2,
  }
}
`;

    const expected: File = {
      name: ".eslintrc.json",
      content: expectedContent,
    };

    const result = generateEsLintConfigFile();
    expect(result).toEqual(expected);
  });
});
