import { SetupTesting } from "@utils/types/SetupTesting";
import setupPhpUnit from "../setupPhpUnit/setupPhpUnit";

const setupTestingOptions = async ({answers, composerPackages, npmPackages}:SetupTesting) => {
    if(answers.tooling.testing) {
        const testingOptions = {
            phpunit: setupPhpUnit,
            //cypress: null,
        }
        Object.keys(answers.tooling.testingOptions).forEach(async key => {
            if (answers.tooling.testingOptions[key]) {
                try {
                    const optionFunction = testingOptions[key];

                    if(optionFunction) {
                        await optionFunction({answers, composerPackages, npmPackages});
                    }
                } catch (error) {
                    throw error;
                }
                // const option = testingOptions.filter( o => o.name === key)[0];
                // if (option.language === 'php') {
                //     composerPackages.push(option.packageName);
                // } else if (option.language === 'javascript') {
                //     npmPackages.push(option.packageName);
                // }
            }
        });
    }
};

export default setupTestingOptions;