import { SetupTestingOption } from "@utils/types/SetupTestingOption";
import testingOptions from "@utils/vars/testingOptions";
import generateJsConfig from "../generateJsConfig/generateJsConfig";
import createFile from "@utils/createFile/createFile";

const setupJest = async ({packages, packageScripts, watchScripts, devScripts, prodScripts}:SetupTestingOption) => {
  const option = testingOptions.filter(o => o.name === "jest")[0];
  packages.push(...option.packageName);

  const jestConfigFile = generateJsConfig();

  createFile({
    directoryPath: `.`,
    fileName: jestConfigFile.name,
    fileContent: jestConfigFile.content
  });

  packageScripts.push(
    {
      key: "test:jest",
      value: "jest"
    },
    {
      key: "test:jest:watch",
      value: "jest --watch"
    }
  );

  watchScripts.push("'npm run test:jest:watch'");

  devScripts.push("npm run test:jest");

  prodScripts.push("npm run test:jest");
};

export default setupJest;