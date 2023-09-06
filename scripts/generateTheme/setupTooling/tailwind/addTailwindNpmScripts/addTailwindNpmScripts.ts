import fs from "fs";
import { red } from "colorette";
import formatMessage from "../../../formatMessage/formatMessage";

const addTailwindNpmScripts = () => {
  try {
    // Read the package.json file
    const packageJsonString = fs.readFileSync("./package.json", {
      encoding: "utf8",
    });
    const packageJson = JSON.parse(packageJsonString);

    // Initialize the scripts object if it doesn't exist
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    // Check if scripts already exist
    const scriptKeys = ["tailwind", "tailwind:prod", "tailwind:watch"];
    for (const key of scriptKeys) {
      if (packageJson.scripts.hasOwnProperty(key)) {
        throw new Error(
          red(`Script key "${key}" already exists in package.json`)
        );
      }
    }

    // Add the new scripts
    packageJson.scripts["tailwind"] =
      "tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/sol-wp/tailwind.css";
    packageJson.scripts["tailwind:prod"] =
      "tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/sol-wp/tailwind.css --minify";
    packageJson.scripts["tailwind:watch"] =
      "tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/sol-wp/tailwind.css --watch";

    // Write the updated package.json back to the file
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

    console.log(
      formatMessage({
        message: "Tailwind scripts added to package.json successfully.",
        color: "green",
      })
    );
  } catch (error) {
    console.error(red("An error occurred:"), error);
    throw error;
  }
};

export default addTailwindNpmScripts;
