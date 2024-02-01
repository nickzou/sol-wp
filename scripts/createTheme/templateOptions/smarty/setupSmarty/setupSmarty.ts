import createDirectory from "@utils/createDirectory/createDirectory";
import { SetupTemplate } from "@utils/types/SetupTemplate";
import generateSetupSmartyFunctionFile from "../generateSetupSmartyFunctionFile/generateSetupSmartyFunctionFile";
import createFile from "@utils/createFile/createFile";

const setupSmarty = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "smarty/smarty"
    ]);

    const setupSmartyFile = generateSetupSmartyFunctionFile();

    createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupSmartyFile.name,
        fileContent: `${setupSmartyFile.content} \nadd_action('template_redirect', 'setup_smarty');`
    })

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
};

export default setupSmarty;