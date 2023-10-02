import { File } from "@utils/types/File";

interface generateEsLintConfigFile {
  extendsArr?: string[];
  plugins?: string[];
  parser: string;
}

const generateEsLintConfigFile = ({
  extendsArr,
  plugins,
  parser,
}: generateEsLintConfigFile): File => {
  const extendsParam = ["eslint:recommended", "prettier"];
  const pluginsParam = ["prettier"];

  if (extendsArr) {
    Array.prototype.push.apply(extendsParam, extendsArr);
  }

  if (plugins) {
    Array.prototype.push.apply(pluginsParam, plugins);
  }
  const content = `{
  "extends": ${JSON.stringify(extendsParam)},
  "plugins": ${JSON.stringify(pluginsParam)},
  ${!!parser ? `"parser": "${parser}",` : ""}
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
