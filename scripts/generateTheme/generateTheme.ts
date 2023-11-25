import { intro, outro } from "@clack/prompts";
import createDirectory from "@utils/createDirectory/createDirectory";
import generateCssFile from "@generateTheme/generateCssFile/generateCssFile";
import generateIndexFile from "@generateTheme/generateIndexFile/generateIndexFile";
import createFile from "@utils/createFile/createFile";
import editWpEnv from "@generateTheme/editWpEnv/editWpEnv";
import { bold, green } from "colorette";
import generateFunctionsFile from "@generateTheme/generateFunctionsFile/generateFunctionsFile";
import generatePrettierRcFile from "./cssOptions/prettier/generatePrettierRcFile/generatePrettierRcFile";
import generateTsConfigFile from "./tsOptions/generateTsConfigFile/generateTsConfigFile";
import installNpmPackages from "@utils/installNpmPackages/installNpmPackages";
import generateEsLintConfigFile from "./generateEsLintConfigFile/generateEsLintConfigFile";
import addScriptsToPackageJson from "@utils/addScriptsToPackageJson/addScriptsToPackageJson";
import generateEsbuildConfigFile from "./tsOptions/generateEsbuildConfigFile/generateEsbuildConfigFile";
import generateTsFile from "./tsOptions/generateTsFile/generateTsFile";
import generateJsFile from "./jsOptions/generateJsFile/generateJsFile";
import generateComposerFile from "./generateComposerFile/generateComposerFile";
import installComposerPackages from "@utils/installComposerPackages/installComposerPackages";
import addToGitignore from "@utils/addToGitignore/addToGitignore";
import appendToFunctionsFile from "./appendToFunctionsFile/appendToFunctionsFile";
import generateCaptureWpHeadFunctionFile from "./templateOptions/common/generateCaptureWpHeadFunctionFile/generateCaptureWpHeadFunctionFile";
import generateCaptureWpFooterFunctionFile from "./templateOptions/common/generateCaptureWpFooterFunctionFile/generateCaptureWpFooterFunctionFile";
import generateIndexTwigFile from "./templateOptions/twig/generateIndexTwigFile/generateIndexTwigFile";
import generateIndexTwigTemplateFile from "./templateOptions/twig/generateIndexTwigTemplateFile/generateIndexTwigTemplateFile";
import generateSetupTwigPhpFunctionFile from "./templateOptions/twig/generateSetupTwigPhpFunctionFile/generateSetupTwigPhpFunctionFile";
import generateSetupLattePhpFunctionFile from "./templateOptions/latte/generateSetupLattePhpFunctionFIle/generateSetupLattePhpFunctionFile";
import generateGetGlobalContextFunctionFile from "./templateOptions/latte/generateGetGlobalContextFunctionFile/generateGetGlobalContextFunctionFile";
import generateIndexLatteFile from "./templateOptions/latte/generateIndexLatteFile/generateIndexLatteFile";
import generateIndexLatteTemplateFile from "./templateOptions/latte/generateIndexLatteTemplateFile/generateIndexLatteTemplateFile";
import getAnswers from "./getAnswers/getAnswers";
import npmPackages from "@utils/vars/npmPackages";
import packageScripts from "@utils/vars/packageScripts";
import composerPackages from "@utils/vars/composerPackages";
import prettierConfigOptions from "@utils/vars/prettierConfigOptions";
import esLintConfigOptions from "@utils/vars/esLintConfigOptions";
import setupCssOption from "./cssOptions/setupCssOption/setupCssOption";
import setupTwig from "./templateOptions/twig/setupTwig/setupTwig";

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

await setupCssOption({functionFile, answers, npmPackages, packageScripts, prettierConfigOptions});

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

  switch (answers.tooling.php.name) {
    case 'twig':

      await setupTwig({answers, composerPackages});
      // composerPackages.push(...[
      //   "twig/twig:^3.0"
      // ]);

      // const setupTwigFile = generateSetupTwigPhpFunctionFile();

      // createFile({
      //   directoryPath: `wp/themes/${answers.theme.directory}/functions`,
      //   fileName: setupTwigFile.name,
      //   fileContent: `${setupTwigFile.content} \nadd_action('template_redirect', 'setup_twig');`
      // });

      // appendToFunctionsFile({
      //   themeFolder: answers.theme.directory,
      //   functionName: setupTwigFile.functionName
      // });

      // createDirectory({
      //   location: `wp/themes/${answers.theme.directory}`,
      //   directoryName: 'views',
      // });

      // const twigIndexFile = generateIndexTwigFile();

      // createFile({
      //   directoryPath: `wp/themes/${answers.theme.directory}`,
      //   fileName: twigIndexFile.name,
      //   fileContent: twigIndexFile.content,
      // });

      // const twigIndexTemplateFile = generateIndexTwigTemplateFile();

      // createFile({
      //   directoryPath: `wp/themes/${answers.theme.directory}/views`,
      //   fileName: twigIndexTemplateFile.name,
      //   fileContent: twigIndexTemplateFile.content,
      // });
      break;
    case 'latte':
      composerPackages.push(...[
        "latte/latte"
      ]);

      createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'temp',
      });

      createDirectory({
        location: `wp/themes/${answers.theme.directory}`,
        directoryName: 'views',
      });

      const setupLattePhpFunctionFile = generateSetupLattePhpFunctionFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupLattePhpFunctionFile.name,
        fileContent: `${setupLattePhpFunctionFile.content}  \nadd_action('template_redirect', 'setup_latte');`
      });

      appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupLattePhpFunctionFile.functionName
      });

      const setupGlobalContextFunctionFile = generateGetGlobalContextFunctionFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/functions`,
        fileName: setupGlobalContextFunctionFile.name,
        fileContent: setupGlobalContextFunctionFile.content
      });

      appendToFunctionsFile({
        themeFolder: answers.theme.directory,
        functionName: setupGlobalContextFunctionFile.functionName
      });

      const indexLatteFile = generateIndexLatteFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}`,
        fileName: indexLatteFile.name,
        fileContent: indexLatteFile.content
      });

      const indexLatteTemplateFile = generateIndexLatteTemplateFile();

      createFile({
        directoryPath: `wp/themes/${answers.theme.directory}/views`,
        fileName: indexLatteTemplateFile.name,
        fileContent: indexLatteTemplateFile.content
      });
      break;
    default:
    const phpFile = generateIndexFile();

    createFile({
      directoryPath: `wp/themes/${answers.theme.directory}`,
      fileName: phpFile.name,
      fileContent: phpFile.content,
    });
  }

  //JavaScript/TypeScript installs
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

  addScriptsToPackageJson([
    ...packageScripts,
    {
      key: `eslint`,
      value: `eslint 'src/themes/${answers.theme.directory}/ts/**/*.{js,jsx,ts,tsx}'`,
    },
    {
      key: `eslint:watch`,
      value: `onchange 'src/themes/${answers.theme.directory}/ts/**/*.{js,jsx,ts,tsx}' -- npm run eslint`,
    },
    {
      key: `esbuild`,
      value: `esrun esbuild.config.ts --sourcemap`,
    },
    {
      key: `esbuild:prod`,
      value: `esrun esbuild.config.ts --minify`,
    },
  ]);

  const composerFile = generateComposerFile({
    themeFolder: answers.theme.directory,
  });

  createFile({
    directoryPath: `wp/themes/${answers.theme.directory}`,
    fileName: composerFile.name,
    fileContent: composerFile.content,
  });

  addToGitignore('.gitignore', [`wp/themes/${answers.theme.directory}/vendor`]);

  await installNpmPackages(npmPackages);
  await installComposerPackages(
    composerPackages,
    `wp/themes/${answers.theme.directory}`
  );

outro(green(bold("Your theme has been generated!")));
