import fs from "fs";
import { red } from "colorette";

interface appendToFunctionsFile {
  themeFolder: string;
  functionName: string;
}
const appendToFunctionsFile = ({
  themeFolder,
  functionName,
}: appendToFunctionsFile) => {
  try {
    const functionsFileContent = fs.readFileSync(
      `./wp/themes/${themeFolder}/functions.php`,
      "utf-8"
    );

    const insertPosition = functionsFileContent.lastIndexOf("?>");

    if (insertPosition === -1) {
      throw new Error(
        red(`Could not find the closing tag in the functions.php file.`)
      );
    }

    const updatedFunctionsFileContent = [
      functionsFileContent.slice(0, insertPosition),
      `require_once get_template_directory() . 'functions/${functionName}.php'\n`,
      functionsFileContent.slice(insertPosition),
    ].join("");

    fs.writeFileSync(
      `./wp/themes/${themeFolder}/functions.php`,
      updatedFunctionsFileContent,
      "utf-8"
    );
  } catch (error) {
    throw new Error(red(`Could not write to functions.php: ${error}`));
  }
};

export default appendToFunctionsFile;
