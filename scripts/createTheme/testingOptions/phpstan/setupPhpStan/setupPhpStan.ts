import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";
import generatePhpStanNeon from "../generatePhpStanNeonFile/generatePhpStanNeon";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import generatePhpStanBootstrapFile from "../generatePhpStanBootstrapFile/generatePhpStanBootstrapFile";

const setupPhpStan = async ({answers, packages, packageScripts, watchScripts}:SetupTestingOption) => {
    const option = testingOptions.filter(o => o.name === 'phpstan')[0];
    packages.push(...option.packageName);

    const phpStanNeonFile = generatePhpStanNeon(answers.theme.directory);

    createFile({
        directoryPath: '.',
        fileName: phpStanNeonFile.name,
        fileContent: phpStanNeonFile.content
    });

    createDirectory({
        location: '.',
        directoryName: 'phpstan'
    });

    const phpStanBootstrapFile = generatePhpStanBootstrapFile();

    createFile({
        directoryPath: './phpstan',
        fileName: phpStanBootstrapFile.name,
        fileContent: phpStanBootstrapFile.content
    });

    packageScripts.push(
        {
            key: 'phpstan',
            value: `wp/themes/${answers.theme.directory}/vendor/bin/phpstan analyse wp/themes/${answers.theme.directory}`
        },
        {
            key: 'phpstan:watch',
            value: `onchange "wp/themes/${answers.theme.directory}/**/*.php" -- npm run phpstan`
        }
    );

    watchScripts.push("'npm run phpstan:watch'");
};

export default setupPhpStan;