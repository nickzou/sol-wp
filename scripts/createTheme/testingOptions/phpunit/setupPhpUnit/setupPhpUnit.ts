import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import { SetupTesting } from "@utils/types/SetupTesting"
import testingOptions from "@utils/vars/testingOptions";

const setupPhpUnit = async ({answers, composerPackages}:SetupTesting) => {
    const option = testingOptions.filter(o => o.name === 'phpunit')[0];
    if(option.language === 'php') {
        composerPackages.push(option.packageName);

        createDirectory({
            location: `wp/themes/${answers.theme.directory}`,
            directoryName: 'tests'
        });

        // createFile({
        //     directoryPath: `wp/themes/${answers.theme.directory}`,
        //     fileName: 
        // })
    }
};

export default setupPhpUnit;