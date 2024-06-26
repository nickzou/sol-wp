import createDirectory from "@utils/createDirectory/createDirectory";
import generateTailwindConfigFile from "../generateTailwindConfigFile/generateTailwindConfigFile";
import createFile from "@utils/createFile/createFile";
import generateTailwindAndUnoContent from "@utils/generateTailwindAndUnoContent/generateTailwindAndUnoContent";
import generateTailwindCssFile from "../generateTailwindCssFile/generateTailwindCssFile";
import { SetupCss } from "@utils/types/SetupCss";

const setupTailwind = async ({registerAssets, answers, npmPackages, packageScripts, watchScripts, devScripts, prodScripts, prettierConfigOptions}:SetupCss) => {
  registerAssets.push({
    handle: 'tailwind',
    file: 'tailwind',
    fileType: 'css'
  });

  let tailwindAndUnoContent = generateTailwindAndUnoContent(answers);

  createDirectory({
    location: `src/themes/${answers.theme.directory}`,
    directoryName: `css`,
  });

  packageScripts.push(...[
    {
      key: "tailwind",
      value: `tailwindcss -i ./src/themes/${answers.theme.directory}/css/tailwind.css -o ./wp/themes/${answers.theme.directory}/css/tailwind.css`,
    },
    {
      key: "tailwind:prod",
      value: `tailwindcss -i ./src/themes/${answers.theme.directory}/css/tailwind.css -o ./wp/themes/${answers.theme.directory}/css/tailwind.css`,
    },
    {
      key: "tailwind:watch",
      value: `tailwindcss -i ./src/themes/${answers.theme.directory}/css/tailwind.css -o ./wp/themes/${answers.theme.directory}/css/tailwind.css --watch`,
    },
  ]);

  watchScripts.push("'npm run tailwind:watch'");

  devScripts.push("npm run tailwind");

  prodScripts.push("npm run tailwind:prod");

  const tailwindConfigFile = generateTailwindConfigFile({
    content: tailwindAndUnoContent,
  });

  const tailwindCssFile = generateTailwindCssFile();

  createFile({
    directoryPath: `.`,
    fileName: tailwindConfigFile.name,
    fileContent: tailwindConfigFile.content,
  });

  createFile({
    directoryPath: `src/themes/${answers.theme.directory}/css`,
    fileName: tailwindCssFile.name,
    fileContent: tailwindCssFile.content,
  });

  prettierConfigOptions.plugins.push(...[
    "prettier-plugin-tailwindcss",
  ]);

  npmPackages.push(...[
    `tailwindcss`,
    "prettier",
    "prettier-plugin-tailwindcss",
  ]);
};

export default setupTailwind;