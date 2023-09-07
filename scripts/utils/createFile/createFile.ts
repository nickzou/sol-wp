import path from "path";
import fs from "fs";
import formatMessage from "../../generateTheme/formatMessage/formatMessage";

interface createFile {
  directoryPath: string;
  fileName: string;
  fileContent: string;
}

const createFile = ({ directoryPath, fileName, fileContent }: createFile) => {
  if (!fs.existsSync(directoryPath)) {
    throw new Error(
      formatMessage({
        message: `Directory "${directoryPath}" does not exist`,
        color: "red",
      })
    );
  }

  const filePath = path.join(directoryPath, fileName);

  if (fs.existsSync(filePath)) {
    throw new Error(
      formatMessage({
        message: `File "${fileName}" already exists in "${directoryPath}"`,
        color: "red",
      })
    );
  }

  fs.writeFileSync(filePath, fileContent);
};

export default createFile;
