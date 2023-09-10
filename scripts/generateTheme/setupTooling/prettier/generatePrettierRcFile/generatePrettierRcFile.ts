import { File } from "@utils/types/File";

const generatePrettierRcFile = (): File => {
  const content = `{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 80,
    "plugins": [
    ]
  }
  `;

  return {
    name: ".prettierrc",
    content,
  };
};

export default generatePrettierRcFile;
