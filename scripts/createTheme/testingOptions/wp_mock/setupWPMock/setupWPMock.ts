import createDirectory from "@utils/createDirectory/createDirectory";
import { SetupTestingOption } from "@utils/types/SetupTestingOption"
import testingOptions from "@utils/vars/testingOptions";

const setupWPMock = async({answers, packages, packageScripts}:SetupTestingOption) => {
    const option = testingOptions.filter(o => o.name === 'wp_mock')[0];
    packages.push(...option.packageName);

    createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'tests'
    });

    
};

export default setupWPMock;