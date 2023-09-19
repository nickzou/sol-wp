import { File } from "@utils/types/File";

interface generatePrettierRcFile {
  plugins: string[];
}

const generatePrettierRcFile = ({ plugins }: generatePrettierRcFile): File => {
  const content = `{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 80,
    "plugins": ${plugins ? JSON.stringify(plugins) : "[]"}
  }
  `;

  return {
    name: ".prettierrc",
    content,
  };
};

export default generatePrettierRcFile;
