import fs from "fs";
import path from "path";
import { red, green, gray } from "colorette";

const createFolder = (folderName: string) => {
  const folderPath = path.join("wp/themes", folderName);

  if (fs.existsSync(folderPath)) {
    throw new Error(
      `${gray(`│`)}  ${red(`Folder "${folderName}" already exists.`)}`
    );
  }

  fs.mkdirSync(folderPath);
  console.log(
    `${gray(`│`)}  ${green(`Folder "${folderName}" has been created.`)}`
  );
  return folderPath;
};

export default createFolder;
