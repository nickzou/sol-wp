import fs from "fs";
import { red } from "colorette";
import { PackageJsonScript } from "../types/PackageJsonScript";

const addScriptsToPackageJson = (scripts: PackageJsonScript[]) => {
  try {
    const packageJsonString = fs.readFileSync("./package.json", {
      encoding: "utf-8",
    });
    const packageJson = JSON.parse(packageJsonString);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    scripts.forEach((script) => {
      packageJson.scripts[script.key] = script.value;
    });

    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
  } catch (error) {
    throw new Error(
      red(`Failed to add scripts to package.json, an error occured: ${error}`)
    );
  }
};

export default addScriptsToPackageJson;
