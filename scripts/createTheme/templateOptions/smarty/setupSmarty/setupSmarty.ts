import createDirectory from "@utils/createDirectory/createDirectory";
import { SetupPhpPackages as SetupTemplate } from "@utils/types/SetupPhpPackages";
import generateSetupSmartyPhpFunctionFile from "../generateSetupSmartyPhpFunctionFile/generateSetupSmartyPhpFunctionFile";
import createFile from "@utils/createFile/createFile";
import appendToFunctionsFile from "@createTheme/appendToFunctionsFile/appendToFunctionsFile";
import generateIndexSmartyFile from "../generateIndexSmartyFile/generateIndexSmartyFile";
import generateIndexSmartyTemplateFile from "../generateIndexSmartyTemplateFile/generateIndexSmartyTemplateFile";

const setupSmarty = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "smarty/smarty"
    ]);

    const setupSmartyFile = generateSetupSmartyPhpFunctionFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupSmartyFile.name,
        fileContent: `${setupSmartyFile.content} \nadd_action('template_redirect', 'setup_smarty');`
    });

    appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupSmartyFile.functionName
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'views'
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}/views`,
        directoryName: 'views'
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}/views`,
        directoryName: 'config'
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}/views`,
        directoryName: 'compile'
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}/views`,
        directoryName: 'cache'
    });

    const smartyIndexFile = generateIndexSmartyFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}`,
        fileName: smartyIndexFile.name,
        fileContent: smartyIndexFile.content
    });


    const smartyIndexTemplateFile = generateIndexSmartyTemplateFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/views/views`,
        fileName: smartyIndexTemplateFile.name,
        fileContent: smartyIndexTemplateFile.content,
    });
};

export default setupSmarty;