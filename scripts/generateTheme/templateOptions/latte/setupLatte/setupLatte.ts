import { SetupTemplate } from "@utils/types/SetupTemplate";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import generateSetupLattePhpFunctionFile from "../generateSetupLattePhpFunctionFIle/generateSetupLattePhpFunctionFile";
import appendToFunctionsFile from "@generateTheme/appendToFunctionsFile/appendToFunctionsFile";
import generateGetGlobalContextFunctionFile from "../generateGetGlobalContextFunctionFile/generateGetGlobalContextFunctionFile";
import generateIndexLatteFile from "../generateIndexLatteFile/generateIndexLatteFile";
import generateIndexLatteTemplateFile from "../generateIndexLatteTemplateFile/generateIndexLatteTemplateFile";

const setupLatte = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
    "latte/latte"
    ]);

    createDirectory({
    location: `wp/themes/${answers.theme.directory}`,
    directoryName: 'temp',
    });

    createDirectory({
    location: `wp/themes/${answers.theme.directory}`,
    directoryName: 'views',
    });

    const setupLattePhpFunctionFile = generateSetupLattePhpFunctionFile();

    createFile({
    directoryPath: `wp/themes/${answers.theme.directory}/functions`,
    fileName: setupLattePhpFunctionFile.name,
    fileContent: `${setupLattePhpFunctionFile.content}  \nadd_action('template_redirect', 'setup_latte');`
    });

    appendToFunctionsFile({
    themeFolder: answers.theme.directory,
    functionName: setupLattePhpFunctionFile.functionName
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

    const indexLatteFile = generateIndexLatteFile();

    createFile({
    directoryPath: `wp/themes/${answers.theme.directory}`,
    fileName: indexLatteFile.name,
    fileContent: indexLatteFile.content
    });

    const indexLatteTemplateFile = generateIndexLatteTemplateFile();

    createFile({
    directoryPath: `wp/themes/${answers.theme.directory}/views`,
    fileName: indexLatteTemplateFile.name,
    fileContent: indexLatteTemplateFile.content
    });
};

export default setupLatte;