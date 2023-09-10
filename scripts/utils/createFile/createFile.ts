import path from "path";
import fs from "fs";
import formatMessage from "@utils/formatMessage/formatMessage";

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
  console.log(
    formatMessage({
      message: `File "${fileName}" has been created.`,
      color: "green",
    })
  );

  fs.writeFileSync(filePath, fileContent);
};

export default createFile;
