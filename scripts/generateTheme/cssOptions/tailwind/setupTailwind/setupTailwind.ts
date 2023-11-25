import styleSolutionEnqueuer from "@generateTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import createDirectory from "@utils/createDirectory/createDirectory";
import packageScripts from "@utils/vars/packageScripts";
import generateTailwindConfigFile from "../generateTailwindConfigFile/generateTailwindConfigFile";
import createFile from "@utils/createFile/createFile";
import generateTailwindAndUnoContent from "@utils/generateTailwindAndUnoContent/generateTailwindAndUnoContent";
import generateTailwindCssFile from "../generateTailwindCssFile/generateTailwindCssFile";
import prettierConfigOptions from "@utils/vars/prettierConfigOptions";
import npmPackages from "@utils/vars/npmPackages";
import { SetupCss } from "@utils/types/SetupCss";

const setupTailwind = async ({functionFile, answers}:SetupCss) => {
      await styleSolutionEnqueuer({
        functionFile,
        theme: answers.theme,
        option: answers.tooling.css,
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