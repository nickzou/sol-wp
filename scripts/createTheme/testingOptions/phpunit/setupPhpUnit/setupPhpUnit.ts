import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import testingOptions from "@utils/vars/testingOptions";
import generatePhpUnitXml from "../generatePhpUnitXml/generatePhpUnitXml";
import { Recipe } from "@utils/types/Recipe";
import { PackageScript } from "@utils/vars/packageScripts";

type setupPhpUnit = {
    answers: Recipe;
    composerPackages: string[],
    packageScripts: PackageScript[]
}

const setupPhpUnit = async ({answers, composerPackages, packageScripts}:setupPhpUnit) => {
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

        packageScripts.push({
            key: 'phpunit',
            value: `wp-env run tests-cli --env-cwd=wp-content/themes/${answers.theme.directory} ./vendor/bin/phpunit`
        });
    }
};

export default setupPhpUnit;