import fs from "fs";
import path from "path";
import formatMessage from "@utils/formatMessage/formatMessage";

interface createDirectory {
  location: string;
  directoryName: string;
}

const createDirectory = ({ location, directoryName }: createDirectory) => {
  const directoryPath = path.join(location, directoryName);

  if (fs.existsSync(directoryPath)) {
    throw new Error(
      formatMessage({
        message: `Folder "${directoryName}" already exists.`,
        color: "red",
      })
    );
  }

  fs.mkdirSync(directoryPath);
  console.log(
    formatMessage({
      message: `Folder "${directoryName}" has been created.`,
      color: "green",
    })
  );
  return directoryPath;
};

export default createDirectory;
