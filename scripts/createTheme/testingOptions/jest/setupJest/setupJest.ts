import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";
import generateJsConfig from "../generateJsConfig/generateJsConfig";
import createFile from "@utils/createFile/createFile";

const setupJest = async ({answers, packages, packageScripts}:SetupTestingOption) => {
    const option = testingOptions.filter(o => o.name === 'jest')[0];
    packages.push(...option.packageName);

    const jestConfigFile = generateJsConfig();

    createFile({
        directoryPath: `.`,
        fileName: jestConfigFile.name,
        fileContent: jestConfigFile.content
    });

    packageScripts.push({
        key: 'test:jest',
        value: 'jest'
    })
};

export default setupJest;