import { Recipe } from "@utils/types/Recipe";
import generateSetupTwigPhpFunctionFile from "../generateSetupTwigPhpFunctionFile/generateSetupTwigPhpFunctionFile";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import appendToFunctionsFile from "@generateTheme/appendToFunctionsFile/appendToFunctionsFile";
import generateIndexTwigFile from "../generateIndexTwigFile/generateIndexTwigFile";
import generateIndexTwigTemplateFile from "../generateIndexTwigTemplateFile/generateIndexTwigTemplateFile";

type SetupTemplate = {
    answers: Recipe;
    composerPackages: string[];
}
const setupTwig = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "twig/twig:^3.0"
      ]);

      const setupTwigFile = generateSetupTwigPhpFunctionFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupTwigFile.name,
        fileContent: `${setupTwigFile.content} \nadd_action('template_redirect', 'setup_twig');`
      });

      appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupTwigFile.functionName
      });

      createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'views',
      });

      const twigIndexFile = generateIndexTwigFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}`,
        fileName: twigIndexFile.name,
        fileContent: twigIndexFile.content,
      });

      const twigIndexTemplateFile = generateIndexTwigTemplateFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/views`,
        fileName: twigIndexTemplateFile.name,
        fileContent: twigIndexTemplateFile.content,
      });
};

export default setupTwig;