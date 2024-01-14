import { SetupTemplate } from "@utils/types/SetupTemplate";
import generateSetupBladeOneFunctionFile from "../generateSetupBladeOnePhpFunctionFile/generateSetupBladeOnePhpFunctionFile";
import createFile from "@utils/createFile/createFile";
import appendToFunctionsFile from "@createTheme/appendToFunctionsFile/appendToFunctionsFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import generateIndexBladeOneFile from "../generateIndexBladeOneFile/generateIndexBladeOneFile";
import generateIndexBladeOneTemplateFile from "../generateIndexBladeOneTemplateFile/generateIndexBladeOneTemplateFile";
import generateGetGlobalContextFunctionFile from "@createTheme/templateOptions/common/generateGetGlobalContextFunctionFile/generateGetGlobalContextFunctionFile";

const setupBladeOne = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "eftec/bladeone"
    ]);

    const setupBladeOneFile = generateSetupBladeOneFunctionFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupBladeOneFile.name,
        fileContent: `${setupBladeOneFile.content} \nadd_action('template_redirect', 'setup_bladeone');`
    });

    appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupBladeOneFile.functionName
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'views'
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'cache'
    });

    const setupGlobalContextFunctionFile = generateGetGlobalContextFunctionFile();

    createFile({
    directoryPath: `wp/themes/${answers.theme.directory}/functions`,
    fileName: setupGlobalContextFunctionFile.name,
    fileContent: setupGlobalContextFunctionFile.content
    });

    appendToFunctionsFile({
    themeFolder: answers.theme.directory,
    functionName: setupGlobalContextFunctionFile.functionName
    });

    const bladeOneIndexFile = generateIndexBladeOneFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}`,
        fileName: bladeOneIndexFile.name,
        fileContent: bladeOneIndexFile.content
    });

    const bladeOneIndexTemplateFile = generateIndexBladeOneTemplateFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/views`,
        fileName: bladeOneIndexTemplateFile.name,
        fileContent: bladeOneIndexTemplateFile.content
    });
    
};

export default setupBladeOne;