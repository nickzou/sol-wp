import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import testingOptions from "@utils/vars/testingOptions";
import generatePhpUnitXml from "../../common/generatePhpUnitXml/generatePhpUnitXml";
import { SetupTestingOption } from "@utils/types/SetupTestingOption";

const setupPhpUnit = async ({answers, packages, packageScripts, watchScripts}:SetupTestingOption) => {
  const option = testingOptions.filter(o => o.name === "phpunit")[0];
  packages.push(...option.packageName);

  createDirectory({
    location: `wp/themes/${answers.theme.directory}`,
    directoryName: "tests"
  });

  const phpUnitXml = generatePhpUnitXml({themeName: answers.theme.name});

  createFile({
    directoryPath: `wp/themes/${answers.theme.directory}`,
    fileName: phpUnitXml.name,
    fileContent: phpUnitXml.content
  });

  packageScripts.push(
    {
      key: "test:phpunit",
      value: `wp-env run tests-cli --env-cwd=wp-content/themes/${answers.theme.directory} ./vendor/bin/phpunit`
    },
    {
      key: "test:phpunit:watch",
      value: `onchange "wp/themes/${answers.theme.directory}/**/*.php" -- npm run test:phpunit`
    }
  );

  watchScripts.push("'npm run test:phpunit:watch'");
};

export default setupPhpUnit;