import createDirectory from "@utils/createDirectory/createDirectory";
import { SetupTemplate } from "@utils/types/SetupTemplate";

const setupSmarty = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "smarty/smarty"
    ]);

    //const setupSmartyFile = 

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