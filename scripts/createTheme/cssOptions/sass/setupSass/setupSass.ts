import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import generateSassConfigFile from "../generateSassConfigFile/generateSassConfigFile";
import generateStylelintFile from "../generateSassStylelintFile/generateSassStylelintFile";
import { SetupCss } from "@utils/types/SetupCss";

const setupSass = async ({registerAssets, answers, npmPackages, packageScripts}:SetupCss) => {
  registerAssets.push({
    handle: 'styles',
    file: 'styles',
    fileType: 'css'
  });

  createDirectory({
    location: `src/themes/${answers.theme.directory}`,
    directoryName: `scss`,
  });

  packageScripts.push(...[
    {
      key: "sass",
      value: `esrun sass.config.ts --minify=false --sourcemap=true`,
    },
    {
      key: "sass:prod",
      value: `esrun sass.config.ts --minify=true --sourcemap=false`,
    },
    {
      key: "sass:watch",
      value: `sass src/themes/${answers.theme.directory}/scss:wp/themes/${answers.theme.directory}/css --load-path=node_modules --style=expanded --embed-source-map --watch`,
    },
    {
      key: "sass:prettier",
      value: `prettier 'src/themes/${answers.theme.directory}/scss/**/*.scss' --write`,
    },
    {
      key: "sass:prettier:watch",
      value: `onchange "src/themes/${answers.theme.directory}/scss/**/*.scss" -- prettier --write --ignore-unknown {{changed}}`,
    },
    {
      key: "stylelint",
      value: `stylelint src/themes/${answers.theme.directory}/scss/**/*.scss`,
    },
    {
      key: "stylelint:watch",
      value: `onchange src/themes/${answers.theme.directory}/scss/**/*.scss -- npm run stylelint`,
    },
    {
      key: "style:watch",
      value:
        'concurrently "npm run sass:watch" "npm run sass:prettier:watch" "npm run stylelint:watch"',
    },
  ]);

  const sassConfigFile = generateSassConfigFile({
    themeFolder: answers.theme.directory,
  });

  const sassStylelintFile = generateStylelintFile();

  createFile({
    directoryPath: ".",
    fileName: sassConfigFile.name,
    fileContent: sassConfigFile.content,
  });

  createFile({
    directoryPath: ".",
    fileName: sassStylelintFile.name,
    fileContent: sassStylelintFile.content,
  });

  createFile({
    directoryPath: `src/themes/${answers.theme.directory}/scss`,
    fileName: "styles.scss",
    fileContent: "@use 'scss-reset/reset';",
  });

  npmPackages.push(...[
    `${answers.tooling.css.packageName}`,
    `scss-reset`,
    `prettier`,
    `stylelint`,
    `stylelint-config-standard-scss`,
    `onchange`,
    `concurrently`,
  ]);
};

export default setupSass;