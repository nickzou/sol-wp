import fs from "fs";
import path from "path";
import formatMessage from "../formatMessage/formatMessage";

const createFolder = (folderName: string) => {
  const folderPath = path.join("wp/themes", folderName);

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
      color: "red",
    })
  );
  return folderPath;
};

export default createFolder;
