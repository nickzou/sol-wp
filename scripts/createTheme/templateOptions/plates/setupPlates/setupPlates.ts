import {SetupTemplate} from "@utils/types/SetupTemplate"
import generateSetupPlatesFunctionFile from "../generateSetupPlatesFunctionFile/generateSetupPlatesFunctionFile";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import appendToFunctionsFile from "@createTheme/appendToFunctionsFile/appendToFunctionsFile";

const setupPlates = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "league/plates"
    ]);

    const setupPlatesFile = generateSetupPlatesFunctionFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupPlatesFile.name,
        fileContent: `${setupPlatesFile.content} \nadd_action('template_redirect', 'setup_plates');`
    });

    createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'views'
    });

    appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupPlatesFile.functionName
    });
};

export default setupPlates;