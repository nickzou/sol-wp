import { SetupTesting } from "@utils/types/SetupTesting"
import testingOptions from "@utils/vars/testingOptions";

const setupPhpUnit = async ({answers, composerPackages}:SetupTesting) => {
    const option = testingOptions.filter(o => o.name === 'phpunit')[0];
    if(option.language === 'php') {
        composerPackages.push(option.packageName);
    }
};

export default setupPhpUnit;