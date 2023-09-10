import { Theme } from "@utils/types/Theme";
import { File } from "@utils/types/File";
import { CssOption } from "@utils/types/CssOption";
import { PackageJsonScript } from "@utils/types/PackageJsonScript";
import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";
import createFolder from "@utils/createFolder/createFolder";
import createFile from "@utils/createFile/createFile";
import appendToFunctionsFile from "@generateTheme/appendToFunctionsFile/appendToFunctionsFile";
import addScriptsToPackageJson from "@utils/addScriptsToPackageJson/addScriptsToPackageJson";

interface configureCssTool {
  functionFile: File;
  theme: Theme;
  option: CssOption;
  cssRegisterName?: string;
  cssFileName?: string;
  scripts: PackageJsonScript[];
}

const configureCssTool = async ({
  functionFile,
  theme,
  option,
  cssRegisterName,
  cssFileName,
  scripts,
}: configureCssTool) => {
  const registerAssetsFile = generatePhpFunctionFile({
    name: "register_assets",
    functionBody: `wp_register_style( '${
      cssRegisterName ? cssRegisterName : option.name
    }', get_template_directory_uri() . '/css/${
      cssFileName ? cssFileName : option.name
    }.css', [], '1.0.0', 'all' );`,
  });

  const enqueueAssetsFile = generatePhpFunctionFile({
    name: "enqueue_assets",
    functionBody: `wp_enqueue_style( '${
      cssRegisterName ? cssRegisterName : option.name
    }' );`,
  });

  createFolder(`${theme.folder}/functions`);

  createFolder(`${theme.folder}/css`);

  createFile({
    directoryPath: `wp/themes/${theme.folder}`,
    fileName: functionFile.name,
    fileContent: functionFile.content,
  });

  createFile({
    directoryPath: `wp/themes/${theme.folder}/functions`,
    fileName: registerAssetsFile.name,
    fileContent: `${registerAssetsFile.content} \nadd_action( 'wp_enqueue_scripts', '${registerAssetsFile.functionName}');`,
  });

  createFile({
    directoryPath: `wp/themes/${theme.folder}/functions`,
    fileName: enqueueAssetsFile.name,
    fileContent: `${enqueueAssetsFile.content} \nadd_action( 'wp_enqueue_scripts', '${enqueueAssetsFile.functionName}');`,
  });

  appendToFunctionsFile({
    themeFolder: theme.folder,
    functionName: registerAssetsFile.functionName,
  });

  appendToFunctionsFile({
    themeFolder: theme.folder,
    functionName: enqueueAssetsFile.functionName,
  });

  addScriptsToPackageJson(scripts);
};

export default configureCssTool;