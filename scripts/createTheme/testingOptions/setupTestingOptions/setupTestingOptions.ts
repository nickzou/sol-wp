import setupPhpUnit from "../phpunit/setupPhpUnit/setupPhpUnit";
import setupWPMock from "../wp_mock/setupWPMock/setupWPMock";
import { Recipe } from "@utils/types/Recipe";
import { PackageScript } from "@utils/vars/packageScripts";
import options from "@utils/vars/testingOptions";
import setupJest from "../jest/setupJest/setupJest";
import setupCypress from "../cypress/setupCypress/setupCypress";
import setupPlaywright from "../playwright/setupPlaywright/setupPlaywright";
import setupPhpStan from "../phpstan/setupPhpStan/setupPhpStan";

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
            wp_mock: setupWPMock,
            phpstan: setupPhpStan,
            jest: setupJest,
            cypress: setupCypress,
            playwright: setupPlaywright
        }
        Object.keys(answers.tooling.testingOptions).forEach(async key => {
            if (answers.tooling.testingOptions[key]) {
                try {
                    const optionFunction = testingOptions[key];

                    if(optionFunction) {
                        const currentOption = options.filter( o => o.name === key)[0];
                        if (currentOption.language === 'php') {
                            await optionFunction({answers, packages: composerPackages, packageScripts});
                        } else {
                            await optionFunction({answers, packages: npmPackages, packageScripts});
                        }
                    }
                } catch (error) {
                    throw error;
                }
            }
        });
    }
};

export default setupTestingOptions;