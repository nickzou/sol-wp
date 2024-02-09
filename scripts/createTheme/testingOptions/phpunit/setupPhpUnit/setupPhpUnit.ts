import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import { SetupTesting } from "@utils/types/SetupTesting"
import testingOptions from "@utils/vars/testingOptions";
import generatePhpUnitXml from "../generatePhpUnitXml/generatePhpUnitXml";

const setupPhpUnit = async ({answers, composerPackages}:SetupTesting) => {
    const option = testingOptions.filter(o => o.name === 'phpunit')[0];
    if(option.language === 'php') {
        composerPackages.push(option.packageName);

        createDirectory({
            location: `wp/themes/${answers.theme.directory}`,
            directoryName: 'tests'
        });

        const phpUnitXml = generatePhpUnitXml({themeName: answers.theme.name});

        createFile({
            directoryPath: `wp/themes/${answers.theme.directory}`,
            fileName: phpUnitXml.name,
            fileContent: phpUnitXml.content
        });
    }
};

export default setupPhpUnit;