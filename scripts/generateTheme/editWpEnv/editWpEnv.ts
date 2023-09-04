import fs from "fs";
import formatMessage from "../formatMessage/formatMessage";

interface editWpEnv {
  wpEnvFile: string;
  directory: string;
}

const editWpEnv = ({ wpEnvFile, directory }: editWpEnv) => {
  const fileContent = fs.readFileSync(wpEnvFile, "utf8");

  if (!fileContent) {
    formatMessage({ message: `"${fileContent}" does not exist`, color: "red" });
  }

  const jsonData = JSON.parse(fileContent);

  if (jsonData.mappings[`wp-content/themes/${directory}`]) {
    throw new Error(
      formatMessage({
        message: `"${directory}" has alreay been mapped in .wp-env.json`,
        color: "red",
      })
    );
  } else if (!jsonData[`wp-content/themes/${directory}`]) {
    jsonData.mappings[
      `wp-content/themes/${directory}`
    ] = `./wp/themes/${directory}`;
  }

  const updatedContent = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(wpEnvFile, updatedContent);
};

export default editWpEnv;
