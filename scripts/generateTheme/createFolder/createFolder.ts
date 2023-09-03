import fs from "fs";
import path from "path";

const createFolder = (folderName: string) => {
  const folderPath = path.join("wp/themes", folderName);

  if (fs.existsSync(folderPath)) {
    console.log(`Folder "${folderName}" already exists.`);
    return false;
  }

  fs.mkdirSync(folderPath);
  console.log(`Folder "${folderName}" has been created.`);
  return true;
};

export default createFolder;
