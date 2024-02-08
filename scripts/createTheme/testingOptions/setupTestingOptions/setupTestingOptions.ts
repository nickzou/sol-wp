import { SetupPhpPackages as SetupTesting } from "@utils/types/SetupPhpPackages";import testingOptions from "@utils/vars/testingOptions";
 "@utils/types/SetupPhpPackages";
const setupTestingOptions = async ({answers, composerPackages}:SetupTesting) => {
    if(answers.tooling.testing) {
        Object.keys(answers.tooling.testingOptions).forEach(key => {
            if (answers.tooling.testingOptions[key]) {
                composerPackages.push(testingOptions.filter(option => option.name === key)[0].packageName);
            }
        });
    }
};

export default setupTestingOptions;