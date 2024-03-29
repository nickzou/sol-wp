import generatePhpUnitXml from "@createTheme/testingOptions/common/generatePhpUnitXml/generatePhpUnitXml";
import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";
import generateWPMockBootstrap from "../generateWPMockBootstrap/generateWPMockBootstrap";

const setupWPMock = async({answers, packages, packageScripts, watchScripts, devScripts}:SetupTestingOption) => {
  const option = testingOptions.filter(o => o.name === "wp_mock")[0];
  packages.push(...option.packageName);

  createDirectory({
    location: `wp/themes/${answers.theme.directory}`,
    directoryName: "tests"
  });

  const phpUnitXml = generatePhpUnitXml({themeName: answers.theme.name, bootstrap: "tests/bootstrap.php"});

  createFile({
    directoryPath: `wp/themes/${answers.theme.directory}`,
    fileName: phpUnitXml.name,
    fileContent: phpUnitXml.content
  });

  const bootstrapFile = generateWPMockBootstrap();

  createFile({
    directoryPath: `wp/themes/${answers.theme.directory}/tests`,
    fileName: bootstrapFile.name,
    fileContent: bootstrapFile.content
  });

  packageScripts.push(
    {
      key: "test:wpmock",
      value: `wp-env run tests-cli --env-cwd=wp-content/themes/${answers.theme.directory} ./vendor/bin/phpunit`
    },
    {
      key: "test:wpmock:watch",
      value: `onchange "wp/themes/${answers.theme.directory}/**/*.php" -- npm run test:wpmock`
    }
  );

  watchScripts.push("'npm run test:wpmock:watch'");

  devScripts.push("'npm run test:wpmock'");
};

export default setupWPMock;