import { File } from "@utils/types/File";

const generateEsLintConfigFile = (): File => {
  const content = `{
  "extends": ["eslint:recommended", "prettier"],
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
    "prefer-template": 2
  }
}
`;

  return {
    name: ".eslintrc.json",
    content,
  };
};

export default generateEsLintConfigFile;
