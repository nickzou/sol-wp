import { Theme } from "@utils/types/Theme";
import { File } from "@utils/types/File";
import { CssOption } from "@utils/types/CssOption";
import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";
import createFolder from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import appendToFunctionsFile from "@generateTheme/appendToFunctionsFile/appendToFunctionsFile";

interface styleSolutionEnqueuer {
  functionFile: File;
  theme: Theme;
  option: CssOption;
  cssRegisterName?: string;
  cssFileName?: string;
}

const styleSolutionEnqueuer = async ({
  functionFile,
  theme,
  option,
  cssRegisterName,
  cssFileName,
}: styleSolutionEnqueuer) => {
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

  createFolder({
    directory: `wp/themes/${theme.directory}`,
    folderName: "functions",
  });

  createFolder({
    directory: `wp/themes/${theme.directory}`,
    folderName: "css",
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
