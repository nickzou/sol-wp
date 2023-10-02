import { File } from "@utils/types/File";

interface generateTsFile {
  themeName: string;
}

const generateTsFile = ({ themeName }: generateTsFile): File => {
  const content = `console.log('hello ${themeName}');`;

  return {
    name: "index.ts",
    content,
  };
};

export default generateTsFile;
