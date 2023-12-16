import { FunctionFile } from "../../utils/types/FunctionFile";

interface generatePhpFunctionFile {
  name: string;
  fileName?: string;
  functionBody: string;
}

const generatePhpFunctionFile = ({
  name,
  fileName,
  functionBody,
}: generatePhpFunctionFile): FunctionFile => {
  const content = `<?php
function ${name}() {
  ${functionBody}
}`;

  return {
    name: `${fileName ? fileName : name}.php`,
    functionName: name,
    content,
  };
};

export default generatePhpFunctionFile;
