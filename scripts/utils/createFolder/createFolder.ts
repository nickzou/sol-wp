import fs from "fs";
import path from "path";
import formatMessage from "@utils/formatMessage/formatMessage";

interface createFolder {
  directory: string;
  folderName: string;
}

const createFolder = ({ directory, folderName }: createFolder) => {
  const folderPath = path.join(directory, folderName);

  if (fs.existsSync(folderPath)) {
    throw new Error(
      formatMessage({
        message: `Folder "${folderName}" already exists.`,
        color: "red",
      })
    );
  }

  fs.mkdirSync(folderPath);
  console.log(
    formatMessage({
      message: `Folder "${folderName}" has been created.`,
      color: "green",
    })
  );
  return folderPath;
};

export default createFolder;
