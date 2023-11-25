import styleSolutionEnqueuer from "@generateTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import packageScripts from "@utils/vars/packageScripts";
import generateUnoConfigFile from "../generateUnoConfigFile/generateUnoConfigFile";
import generateTailwindAndUnoContent from "@utils/generateTailwindAndUnoContent/generateTailwindAndUnoContent";
import createFile from "@utils/createFile/createFile";
import npmPackages from "@utils/vars/npmPackages";
import { SetupCss } from "@utils/types/SetupCSS";

const setupUno = async ({functionFile, answers}:SetupCss) => {
      await styleSolutionEnqueuer({
        functionFile,
        theme: answers.theme,
        option: answers.tooling.css,
      });

      let tailwindAndUnoContent = generateTailwindAndUnoContent(answers);

      packageScripts.push(...[
        { key: "uno", value: "unocss" },
        { key: "uno:prod", value: "unocss --minify" },
        { key: "uno:watch", value: "unocss --watch" },
      ]);

      const unoConfigFile = generateUnoConfigFile({
        content: tailwindAndUnoContent,
        outFile: `wp/themes/${answers.theme.directory}/css/uno.css`,
      });

      createFile({
        directoryPath: ".",
        fileName: unoConfigFile.name,
        fileContent: unoConfigFile.content,
      });

      npmPackages.push(...[
        `${answers.tooling.css.packageName}`,
      ]);
};

export default setupUno;