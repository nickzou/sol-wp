import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";
import generateCypressConfig from "../generateCypressConfig/generateCypressConfig";
import createFile from "@utils/createFile/createFile";

const setupCypress = async({answers, packages, packageScripts}:SetupTestingOption) => {
    const option = testingOptions.filter(o => o.name === 'cypress')[0];
    packages.push(...option.packageName);

    const cypressConfigFile = generateCypressConfig();

    createFile({
        directoryPath: '.',
        fileName: cypressConfigFile.name,
        fileContent: cypressConfigFile.content
    });

    packageScripts.push(...[{
        key: 'test:cypress-open',
        value: 'cypress open'
    }, {
        key: 'test:cypress',
        value: 'cypress run'
    }]);
};

export default setupCypress;