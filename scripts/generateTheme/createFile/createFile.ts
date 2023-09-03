import path from "path";
import fs from "fs";
import { red, gray } from "colorette";

interface createFile {
  directoryPath: string;
  fileName: string;
  fileContent: string;
}

const createFile = ({ directoryPath, fileName, fileContent }: createFile) => {
  if (!fs.existsSync(directoryPath)) {
    throw new Error(
      `${gray(`│`)}  ${red(`Directory "${directoryPath}" does not exist`)}`
    );
  }

  const filePath = path.join(directoryPath, fileName);

  if (fs.existsSync(filePath)) {
    throw new Error(
      `${gray(`│`)}  ${red(
        `File "${fileName}" already exists in "${directoryPath}"`
      )}`
    );
  }

  fs.writeFileSync(filePath, fileContent);
};

export default createFile;
