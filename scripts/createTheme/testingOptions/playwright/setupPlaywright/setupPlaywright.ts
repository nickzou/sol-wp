import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";
import generatePlaywrightConfig from "../generatePlaywrightConfig/generatePlaywrightConfig";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";

const setupPlaywright = async({packages, packageScripts, prodScripts}:SetupTestingOption) => {
  const option = testingOptions.filter( o => o.name === "playwright")[0];
  packages.push(...option.packageName);

  const playwrightConfigFile = generatePlaywrightConfig();

  createFile({
    directoryPath: ".",
    fileName: playwrightConfigFile.name,
    fileContent: playwrightConfigFile.content
  });

  createDirectory({
    location: ".",
    directoryName: "playwright"
  });

  packageScripts.push(...[{
    key: "test:playwright",
    value: "playwright test"
  }]);

  prodScripts.push("'npm run test:playwright'");
};

export default setupPlaywright;