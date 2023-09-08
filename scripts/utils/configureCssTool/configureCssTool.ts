import { Theme } from "../types/Theme";
import { File } from "../types/File";
import { CssOption } from "../types/CssOption";
import { PackageJsonScript } from "../types/PackageJsonScript";
import generatePhpFunctionFile from "../../generateTheme/generatePhpFunctionFile/generatePhpFunctionFile.js";
import createFolder from "../createFolder/createFolder.js";
import createFile from "../createFile/createFile.js";
import executeCommand from "../executeCommand/executeCommand.js";
import createTailwindConfig from "../../generateTheme/setupTooling/tailwind/createTailwindConfig/createTailwindConfig.js";
import generateTailwindCssFile from "../../generateTheme/setupTooling/tailwind/generateTailwindCssFile/generateTailwindCssFile.js";
import appendToFunctionsFile from "../../generateTheme/appendToFunctionsFile/appendToFunctionsFile.js";
import addScriptsToPackageJson from "../addScriptsToPackageJson/addScriptsToPackageJson";
import createUnoConfig from "../../generateTheme/setupTooling/uno/createUnoConfig/createUnoConfig";

interface configureCssTool {
  functionFile: File;
  theme: Theme;
  option: CssOption;
  scripts: PackageJsonScript[];
}

const configureCssTool = async ({
  functionFile,
  theme,
  option,
  scripts,
}: configureCssTool) => {
  const enqueueAssetsFile = generatePhpFunctionFile({
    name: "enqueue_assets",
    functionBody: `wp_enqueue_style( '${option.name}', get_template_directory_uri() . '/css/${option.name}.css', [], '1.0.0', 'all' );`,
  });

  createFolder(`${theme.folder}/functions`);

  createFolder(`${theme.folder}/css`);

  createFile({
    directoryPath: `wp/themes/${theme.folder}`,
    fileName: functionFile.name,
    fileContent: functionFile.content,
  });

  await executeCommand("npm", [
    "install",
    `${option.packageName}`,
    "--save-dev",
  ]);

  switch (option.name) {
    case "tailwind":
      createTailwindConfig({
        content: [
          `wp/themes/${theme.folder}/**/*.php`,
          `src/ts/**/*.{js, jsx, ts, tsx}`,
        ],
      });

      const tailwindCssFile = generateTailwindCssFile();

      createFile({
        directoryPath: `src/css`,
        fileName: tailwindCssFile.name,
        fileContent: tailwindCssFile.content,
      });
      break;
    case "uno":
      createUnoConfig({
        content: [
          `wp/themes/${theme.folder}/**/*.php`,
          `src/ts/**/*.{js, jsx, ts, tsx}`,
        ],
        outFile: `wp/themes/${theme.folder}/css/uno.css`,
      });
      break;
  }

  createFile({
    directoryPath: `wp/themes/${theme.folder}/functions`,
    fileName: enqueueAssetsFile.name,
    fileContent: `${enqueueAssetsFile.content} \nadd_action( 'wp_enqueue_scripts', 'enqueue_assets');`,
  });

  appendToFunctionsFile({
    themeFolder: theme.folder,
    functionName: enqueueAssetsFile.functionName,
  });

  addScriptsToPackageJson(scripts);
};

export default configureCssTool;
