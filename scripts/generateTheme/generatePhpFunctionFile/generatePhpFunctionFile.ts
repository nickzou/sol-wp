import { File } from "../../utils/types/File";

interface generatePhpFunctionFile {
  name: string;
  fileName?: string;
  functionBody: string;
}

const generatePhpFunctionFile = ({
  name,
  fileName,
  functionBody,
}: generatePhpFunctionFile): File => {
  const content = ` function ${name} {
    ${functionBody}
  }
  `;

  return {
    name: `${fileName ? fileName : name}.php`,
    content,
  };
};

export default generatePhpFunctionFile;
