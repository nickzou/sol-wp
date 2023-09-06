import { File } from "../../utils/types/File";
interface generateCssFile {
  name: string;
  author: string;
  description: string;
  version: string;
}

const generateCssFile = ({
  name,
  author,
  description,
  version,
}: generateCssFile): File => {
  const content = `/*
    Theme Name: ${name}
    Author: ${author}
    Description: ${description}
    Version: ${version}
    */
  `;

  return {
    name: `style.css`,
    content,
  };
};

export default generateCssFile;
