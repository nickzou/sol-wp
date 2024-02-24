import { registerAsset } from "@utils/vars/registerAssets";
import generateEsbuildConfigFile from "@createTheme/tsOptions/generateEsbuildConfigFile/generateEsbuildConfigFile";
import { Recipe } from "@utils/types/Recipe";
import createFile from "@utils/createFile/createFile";
import createDirectory from "@utils/createDirectory/createDirectory";
import generateTsConfigFile from "@createTheme/tsOptions/generateTsConfigFile/generateTsConfigFile";
import generateTsFile from "@createTheme/tsOptions/generateTsFile/generateTsFile";
import {type esLintConfigOptions} from "@utils/vars/esLintConfigOptions";
import generateJsFile from "@createTheme/jsOptions/generateJsFile/generateJsFile";
import generateTsConfigDevFile from "@createTheme/tsOptions/generateTsConfigDevFile/generateTsConfigDevFile";

interface setupJs {
    registerAssets: registerAsset[];
    answers: Recipe;
    npmPackages: string[];
    esLintConfigOptions: esLintConfigOptions;
}

const setupJs = async ({registerAssets, answers, npmPackages, esLintConfigOptions}:setupJs) => {
    registerAssets.push({
        handle: 'index',
        file: 'index',
        fileType: 'js'
    });

  const esbuildConfigFile = generateEsbuildConfigFile({
    themeFolder: answers.theme.directory,
  });

  createFile({
    directoryPath: ".",
    fileName: esbuildConfigFile.name,
    fileContent: esbuildConfigFile.content,
  });

  if (answers.tooling.ts) {
    createDirectory({
      location: `src/themes/${answers.theme.directory}`,
      directoryName: `ts`,
    });

    const tsConfigFile = generateTsConfigFile();

    createFile({
      directoryPath: ".",
      fileName: tsConfigFile.name,
      fileContent: tsConfigFile.content,
    });

    const tsConfigDevFile = generateTsConfigDevFile();

    createFile({
      directoryPath: ".",
      fileName: tsConfigDevFile.name,
      fileContent: tsConfigDevFile.content,
    });

    const tsFile = generateTsFile({ themeName: answers.theme.name });

    createFile({
      directoryPath: `src/themes/${answers.theme.directory}/ts`,
      fileName: tsFile.name,
      fileContent: tsFile.content,
    });

    npmPackages.push(...[
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
    ]);

    esLintConfigOptions.extendsArr.push(...[
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
    ]);

    esLintConfigOptions.plugins.push(...[
      "@typescript/parser",
    ]);

    esLintConfigOptions.parser = "@typescript-eslint/parser";
  } else {
    createDirectory({
      location: `src/themes/${answers.theme.directory}`,
      directoryName: `js`,
    });

    const jsFile = generateJsFile({ themeName: answers.theme.name });

    createFile({
      directoryPath: `src/themes/${answers.theme.directory}/js`,
      fileName: jsFile.name,
      fileContent: jsFile.content,
    });
  }
};

export default setupJs;