import setupPhpUnit from "../phpunit/setupPhpUnit/setupPhpUnit";
import { Recipe } from "@utils/types/Recipe";
import { PackageScript } from "@utils/vars/packageScripts";

type SetupTestingOptions = {
    answers: Recipe;
    composerPackages: string[];
    npmPackages: string[];
    packageScripts: PackageScript[];
}

const setupTestingOptions = async ({answers, composerPackages, npmPackages, packageScripts}:SetupTestingOptions) => {
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
                        await optionFunction({answers, composerPackages, npmPackages, packageScripts});
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