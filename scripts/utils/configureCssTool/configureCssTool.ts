import { Theme } from "../types/Theme";
import { File } from "../types/File";
import { CssOption } from "../types/CssOption";
import generatePhpFunctionFile from "../../generateTheme/generatePhpFunctionFile/generatePhpFunctionFile.js";
import createFolder from "../createFolder/createFolder.js";
import createFile from "../createFile/createFile.js";
import executeCommand from "../executeCommand/executeCommand.js";
import createTailwindConfig from "../../generateTheme/setupTooling/tailwind/createTailwindConfig/createTailwindConfig.js";
import generateTailwindCssFile from "../../generateTheme/setupTooling/tailwind/generateTailwindCssFile/generateTailwindCssFile.js";
import appendToFunctionsFile from "../../generateTheme/appendToFunctionsFile/appendToFunctionsFile.js";
import addScriptsToPackageJson from "../addScriptsToPackageJson/addScriptsToPackageJson";

interface configureCssTool {
  functionFile: File;
  theme: Theme;
  option: CssOption;
}

const configureCssTool = async ({
  functionFile,
  theme,
  option,
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

  createTailwindConfig({
    content: [
      `wp/themes/${theme.folder}/**/*.php`,
      `src/ts/**/*.{js, jsx, ts, tsx}`,
    ],
  });

  if (option.name === "tailwind") {
    const tailwindCssFile = generateTailwindCssFile();

    createFile({
      directoryPath: `src/css`,
      fileName: tailwindCssFile.name,
      fileContent: tailwindCssFile.content,
    });
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

  addScriptsToPackageJson([
    {
      key: "tailwind",
      value: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${theme.folder}/css/tailwind.css`,
    },
    {
      key: "tailwind:prod",
      value: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${theme.folder}/css/tailwind.css`,
    },
    {
      key: "tailwind:watch",
      value: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${theme.folder}/css/tailwind.css --watch`,
    },
  ]);
};

export default configureCssTool;
