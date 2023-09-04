import fs from "fs";
import { red, gray } from "colorette";

interface editWpEnv {
  wpEnvFile: string;
  directory: string;
}

const editWpEnv = ({ wpEnvFile, directory }: editWpEnv) => {
  const fileContent = fs.readFileSync(wpEnvFile, "utf8");

  if (!fileContent) {
    throw new Error(`${gray(`│`)}  ${red(`"${fileContent}" does not exist`)}`);
  }

  const jsonData = JSON.parse(fileContent);

  if (jsonData.mappings[`wp-content/themes/${directory}`]) {
    throw new Error(`${gray(`│`)}  
      ${red(`"${directory}" has alreay been mapped in .wp-env.json`)}`);
  } else if (!jsonData[`wp-content/themes/${directory}`]) {
    jsonData.mappings[
      `wp-content/themes/${directory}`
    ] = `./wp/themes/${directory}`;
  }

  const updatedContent = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(wpEnvFile, updatedContent);
};

export default editWpEnv;
