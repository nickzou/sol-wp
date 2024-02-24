import { Theme } from "@utils/types/Theme";
import { File } from "@utils/types/File";
import { CssOption } from "@utils/types/CssOption";
import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import appendToFunctionsFile from "@createTheme/appendToFunctionsFile/appendToFunctionsFile";
import { registerAsset } from "@utils/vars/registerAssets";
import generateStyleRegisterTemplate from "@createTheme/cssOptions/generateStyleRegisterTemplate/generateStyleRegisterTemplate";
import generateStyleEnqueueTemplate from "@createTheme/cssOptions/generateStyleEnqueueTemplate/generateStyleEnqueueTemplate";
import generateJsRegisterTemplate from "@createTheme/jsOptions/generateJsRegisterTemplate/generateJsRegisterTemplate";
import generateJsEnqueueTemplate from "@createTheme/jsOptions/generateJsEnqueueTemplate/generateJsEnqueueTemplate";

interface styleSolutionEnqueuer {
  functionFile: File;
  theme: Theme;
  registerAssets: registerAsset[]
}

const styleSolutionEnqueuer = async ({
  functionFile,
  theme,
  registerAssets
}: styleSolutionEnqueuer) => {
  const cssAssets = registerAssets.filter(a => a.fileType === 'css');
  const jsAssets:registerAsset[] = registerAssets.filter(a => a.fileType === 'js');

  const cssRegisterString = cssAssets.map(a => generateStyleRegisterTemplate({
    handle: a.handle,
    file: a.file
  })).join('\n');

  const jsAssetsString = jsAssets.map(a => generateJsRegisterTemplate({handle: a.handle, file: a.file})).join('\n');

  const registerAssetsFile = generatePhpFunctionFile({
    name: "register_assets",
    functionBody: cssRegisterString+jsAssetsString
  });

  const cssEnqueueString = cssAssets.map( a => generateStyleEnqueueTemplate({handle: a.handle})).join('\n');

  const jsEnqueueString = jsAssets.map( a => generateJsEnqueueTemplate({handle: a.handle})).join('\n');

  const enqueueAssetsFile = generatePhpFunctionFile({
    name: "enqueue_assets",
    functionBody: cssEnqueueString + jsEnqueueString,
  });

  createDirectory({
    location: `wp/themes/${theme.directory}`,
    directoryName: "functions",
  });

  createDirectory({
    location: `wp/themes/${theme.directory}`,
    directoryName: "css",
  });

  createFile({
    directoryPath: `wp/themes/${theme.directory}`,
    fileName: functionFile.name,
    fileContent: functionFile.content,
  });

  createFile({
    directoryPath: `wp/themes/${theme.directory}/functions`,
    fileName: registerAssetsFile.name,
    fileContent: `${registerAssetsFile.content} \nadd_action( 'wp_enqueue_scripts', '${registerAssetsFile.functionName}');`,
  });

  createFile({
    directoryPath: `wp/themes/${theme.directory}/functions`,
    fileName: enqueueAssetsFile.name,
    fileContent: `${enqueueAssetsFile.content} \nadd_action( 'wp_enqueue_scripts', '${enqueueAssetsFile.functionName}');`,
  });

  appendToFunctionsFile({
    themeFolder: theme.directory,
    functionName: registerAssetsFile.functionName,
  });

  appendToFunctionsFile({
    themeFolder: theme.directory,
    functionName: enqueueAssetsFile.functionName,
  });
};

export default styleSolutionEnqueuer;
