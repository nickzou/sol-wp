import fs from "fs";
import path from "path";

interface ICreateCssFile {
  themeName: string;
  description: string;
  author: string;
  version: string;
  directoryName: string;
}

const createCssFile = ({
  themeName,
  description,
  author,
  version,
  directoryName,
}: ICreateCssFile) => {
  // Validate that all arguments are provided
  if (!themeName || !description || !author || !version || !directoryName) {
    return "Please provide all required parameters: themeName, description, author, version, directoryName";
  }

  // Define the content for style.css
  const cssContent = `/*
    Theme Name: ${themeName}
    Description: ${description}
    Author: ${author}
    Version: ${version}
    */`;

  // Create the target directory if it doesn't exist
  const directoryPath = path.join("wp", "themes", directoryName);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Create the style.css file and write the content
  const cssFilePath = path.join(directoryPath, "style.css");
  fs.writeFileSync(cssFilePath, cssContent);

  return "style.css generated successfully.";
};

export default createCssFile;
