import generateUnoConfigFile from "../generateUnoConfigFile/generateUnoConfigFile";
import generateTailwindAndUnoContent from "@utils/generateTailwindAndUnoContent/generateTailwindAndUnoContent";
import createFile from "@utils/createFile/createFile";
import { SetupCss } from "@utils/types/SetupCss";
import prodScripts from "@utils/vars/prodScripts";

const setupUno = async ({registerAssets, answers, npmPackages, watchScripts, devScripts, packageScripts}:SetupCss) => {
  registerAssets.push({
    handle: 'uno',
    file: 'uno',
    fileType: 'css'
  });

  let tailwindAndUnoContent = generateTailwindAndUnoContent(answers);

  packageScripts.push(...[
    { key: "uno", value: "unocss" },
    { key: "uno:prod", value: "unocss --minify" },
    { key: "uno:watch", value: "unocss --watch" },
  ]);

  watchScripts.push("npm run uno:watch");

  devScripts.push("npm run uno");

  prodScripts.push("npm run uno:prod");

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