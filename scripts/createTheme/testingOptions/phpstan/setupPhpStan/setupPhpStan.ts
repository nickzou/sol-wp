import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";

const setupPhpStan = async ({answers, packages, packageScripts}:SetupTestingOption) => {
    const option = testingOptions.filter(o => o.name === 'phpstan')[0];
    packages.push(...option.packageName);

    packageScripts.push({
        key: 'phpstan',
        value: `wp/themes/${answers.theme.directory}/vendor/bin/phpstan analyse wp/themes/${answers.theme.directory}`
    });
};

export default setupPhpStan;