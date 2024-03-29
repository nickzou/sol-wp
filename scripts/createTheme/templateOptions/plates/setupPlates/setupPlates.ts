import { SetupPhpPackages as SetupTemplate } from "@utils/types/SetupPhpPackages";
import generateSetupPlatesPhpFunctionFile from "../generateSetupPlatesPhpFunctionFile/generateSetupPlatesPhpFunctionFile";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import appendToFunctionsFile from "@createTheme/appendToFunctionsFile/appendToFunctionsFile";
import generateIndexPlatesFile from "../generateIndexPlatesFile/generateIndexPlatesFile";
import generateIndexPlatesTemplateFile from "../generateIndexPlatesTemplateFile/generateIndexPlatesTemplateFile";

const setupPlates = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "league/plates"
    ]);

    const setupPlatesFile = generateSetupPlatesPhpFunctionFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupPlatesFile.name,
        fileContent: `${setupPlatesFile.content} \nadd_action('template_redirect', 'setup_plates');`
    });

    appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupPlatesFile.functionName
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'views'
    });

    const platesIndexFile = generateIndexPlatesFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}`,
        fileName: platesIndexFile.name,
        fileContent: platesIndexFile.content,
    });

    const platesIndexTemplateFile = generateIndexPlatesTemplateFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/views`,
        fileName: platesIndexTemplateFile.name,
        fileContent: platesIndexTemplateFile.content,
    });   
};

export default setupPlates;