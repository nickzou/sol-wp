import { File } from "@utils/types/File";

interface generateJsFile {
  themeName: string;
}

const generateJsFile = ({ themeName }: generateJsFile): File => {
  const content = `console.log("hello ${themeName}");`;

  return {
    name: "index.js",
    content,
  };
};

export default generateJsFile;
