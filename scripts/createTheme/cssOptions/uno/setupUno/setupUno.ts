import styleSolutionEnqueuer from "@createTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import generateUnoConfigFile from "../generateUnoConfigFile/generateUnoConfigFile";
import generateTailwindAndUnoContent from "@utils/generateTailwindAndUnoContent/generateTailwindAndUnoContent";
import createFile from "@utils/createFile/createFile";
import { SetupCss } from "@utils/types/SetupCss";

const setupUno = async ({registerAssets, answers, npmPackages, packageScripts}:SetupCss) => {
  registerAssets.push({
    handle: 'uno',
    file: 'uno',
    fileType: 'css'
  });
  
  // await styleSolutionEnqueuer({
  //   functionFile,
  //   theme: answers.theme,
  //   option: answers.tooling.css,
  // });

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