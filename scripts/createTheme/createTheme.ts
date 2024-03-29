import { intro, outro } from "@clack/prompts";
import createDirectory from "@utils/createDirectory/createDirectory";
import generateCssFile from "@createTheme/generateCssFile/generateCssFile";
import createFile from "@utils/createFile/createFile";
import editWpEnv from "@createTheme/editWpEnv/editWpEnv";
import { bold, green } from "colorette";
import generateFunctionsFile from "@createTheme/generateFunctionsFile/generateFunctionsFile";
import generatePrettierRcFile from "./cssOptions/prettier/generatePrettierRcFile/generatePrettierRcFile";
import installNpmPackages from "@utils/installNpmPackages/installNpmPackages";
import generateEsLintConfigFile from "./generateEsLintConfigFile/generateEsLintConfigFile";
import addScriptsToPackageJson from "@utils/addScriptsToPackageJson/addScriptsToPackageJson";
import generateComposerFile from "./generateComposerFile/generateComposerFile";
import installComposerPackages from "@utils/installComposerPackages/installComposerPackages";
import addToGitignore from "@utils/addToGitignore/addToGitignore";
import appendToFunctionsFile from "./appendToFunctionsFile/appendToFunctionsFile";
import generateCaptureWpHeadFunctionFile from "./templateOptions/common/generateCaptureWpHeadFunctionFile/generateCaptureWpHeadFunctionFile";
import generateCaptureWpFooterFunctionFile from "./templateOptions/common/generateCaptureWpFooterFunctionFile/generateCaptureWpFooterFunctionFile";
import getAnswers from "./getAnswers/getAnswers";
import npmPackages from "@utils/vars/npmPackages";
import packageScripts from "@utils/vars/packageScripts";
import composerPackages from "@utils/vars/composerPackages";
import prettierConfigOptions from "@utils/vars/prettierConfigOptions";
import esLintConfigOptions from "@utils/vars/esLintConfigOptions";
import setupCssOption from "./cssOptions/setupCssOption/setupCssOption";
import setupTemplateOption from "./templateOptions/setupTemplateOption/setupTemplateOption";
import setupTestingOptions from "./testingOptions/setupTestingOptions/setupTestingOptions";
import setupBrowserSync from "@utils/setupBrowserSync/setupBrowserSync";
import registerAssets from "@utils/vars/registerAssets";
import assetRegisterAndEnqueuer from "./assetRegisterAndEnqueuer/assetRegisterAndEnqueuer";
import setupJs from "./setupJs/setupJs/setupJs";
import watchScripts from "@utils/vars/watchScripts";
import devScripts from "@utils/vars/devScripts";
import prodScripts from "@utils/vars/prodScripts";

intro(bold(`Generate Theme`));

const answers = await getAnswers();

const cssFile = generateCssFile({
  name: answers.theme.name,
  author: answers.theme.author,
  description: answers.theme.description,
  version: answers.theme.version,
});

//Create Theme Folder in src folder
createDirectory({ location: `src/themes`, directoryName: answers.theme.directory });

//Creates Theme Folder in WP folder
createDirectory({ location: "wp/themes", directoryName: answers.theme.directory });

createFile({
  directoryPath: `wp/themes/${answers.theme.directory}`,
  fileName: cssFile.name,
  fileContent: cssFile.content,
});

editWpEnv({ wpEnvFile: `.wp-env.json`, directory: answers.theme.directory });

const functionFile = generateFunctionsFile();

await setupCssOption({registerAssets, answers, npmPackages, packageScripts, watchScripts, devScripts, prodScripts, prettierConfigOptions});

await setupJs({registerAssets, answers, npmPackages, packageScripts, watchScripts, devScripts, esLintConfigOptions});

await assetRegisterAndEnqueuer({functionFile, theme: answers.theme, registerAssets});

const captureWpHeadFunctionFile = generateCaptureWpHeadFunctionFile;

createFile({
  directoryPath: `wp/themes/${answers.theme.directory}/functions`,
  fileName: captureWpHeadFunctionFile.name,
  fileContent: captureWpHeadFunctionFile.content
});

appendToFunctionsFile({
  themeFolder: answers.theme.directory,
  functionName: captureWpHeadFunctionFile.functionName
});

const captureWpFooterFunctionFile = generateCaptureWpFooterFunctionFile;

createFile({
  directoryPath: `wp/themes/${answers.theme.directory}/functions`,
  fileName: captureWpFooterFunctionFile.name,
  fileContent: captureWpFooterFunctionFile.content
});

appendToFunctionsFile({
  themeFolder: answers.theme.directory,
  functionName: captureWpFooterFunctionFile.functionName
});

await setupTemplateOption({answers, composerPackages});

await setupTestingOptions({answers, composerPackages, npmPackages, packageScripts, watchScripts, devScripts});

const prettierRcFile = generatePrettierRcFile({
  plugins: prettierConfigOptions.plugins,
});

createFile({
  directoryPath: ".",
  fileName: prettierRcFile.name,
  fileContent: prettierRcFile.content,
});

const esLintConfigFile = generateEsLintConfigFile(esLintConfigOptions);

createFile({
  directoryPath: ".",
  fileName: esLintConfigFile.name,
  fileContent: esLintConfigFile.content,
});

watchScripts.push("'npm run eslint:watch'");

await setupBrowserSync({npmPackages, packageScripts, watchScripts});

addScriptsToPackageJson([...packageScripts,
  {
    key: "watch",
    value: watchScripts.join(" ")
  }
]);

addScriptsToPackageJson([...packageScripts, {
  key: "dev",
  value: devScripts.join(" & ")
}, {
  key: "prod",
  value: prodScripts.join( " & ")
}]);

const composerFile = generateComposerFile({
  themeFolder: answers.theme.directory,
});

createFile({
  directoryPath: `wp/themes/${answers.theme.directory}`,
  fileName: composerFile.name,
  fileContent: composerFile.content,
});

addToGitignore(".gitignore", [
  `wp/themes/${answers.theme.directory}/vendor`,
  `wp/themes/${answers.theme.directory}/css`,
  `wp/themes/${answers.theme.directory}/js`
]);

await installNpmPackages(npmPackages);

await installComposerPackages(
  composerPackages,
  `wp/themes/${answers.theme.directory}`
);

outro(green(bold("Your theme has been generated!")));
