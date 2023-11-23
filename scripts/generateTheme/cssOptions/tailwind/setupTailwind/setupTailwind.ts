import styleSolutionEnqueuer from "@generateTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import createDirectory from "@utils/createDirectory/createDirectory";
import { File } from "@utils/types/File";
import { Recipe } from "@utils/types/Recipe";

interface SetupTailwind {
    functionFile: File,
    answers: Recipe
}

const setupTailwind = async ({functionFile, answers}:SetupTailwind) => {
      await styleSolutionEnqueuer({
        functionFile,
        theme: answers.theme,
        option: answers.tooling.css,
      });

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
        `${answers.tooling.css.packageName}`,
        "prettier",
        "prettier-plugin-tailwindcss",
      ]);
}