import { intro, outro, text, select, confirm, isCancel } from "@clack/prompts";
import formatMessage from "@utils/formatMessage/formatMessage";
import createFolder from "@utils/createFolder/createFolder";
import generateCssFile from "@generateTheme/generateCssFile/generateCssFile";
import generateIndexFile from "@generateTheme/generateIndexFile/generateIndexFile";
import createFile from "@utils/createFile/createFile";
import editWpEnv from "@generateTheme/editWpEnv/editWpEnv";
import { bold, green } from "colorette";
import generateFunctionsFile from "@generateTheme/generateFunctionsFile/generateFunctionsFile";
import { Recipe } from "@utils/types/Recipe";
import configureCssTool from "@generateTheme/configureCssTool/configureCssTool";
import cssOptions from "@utils/vars/cssOptions";
import executeCommand from "@utils/executeCommand/executeCommand";
import generateTailwindConfigFile from "@generateTheme/cssOptions/tailwind/generateTailwindConfigFile/generateTailwindConfigFile";
import generateTailwindCssFile from "@generateTheme/cssOptions/tailwind/generateTailwindCssFile/generateTailwindCssFile";
import generateUnoConfigFile from "@generateTheme/cssOptions/uno/generateUnoConfigFile/generateUnoConfigFile";
import generateSassConfigFile from "@generateTheme/cssOptions/sass/generateSassConfigFile/generateSassConfigFile";
import generatePrettierRcFile from "./cssOptions/prettier/generatePrettierRcFile/generatePrettierRcFile";
import editJson from "@utils/editJson/editJson";
import generateSassStylelintFile from "@generateTheme/cssOptions/sass/generateSassStylelintFile/generateSassStylelintFile";
import formatFolderName from "@utils/formatFolderName/formatFolderName";
import generatePostCssConfigFile from "./cssOptions/postcss/generatePostCssConfigFile/generatePostCssConfigFile";
import generatePostCssProdConfigFile from "./cssOptions/postcss/generatePostCssProdConfigFile/generatePostCssProdConfigFile";

const htmlRegex = /<\/?[a-z][\s\S]*>/i;
const spacesRegex = /\s+/;

intro(bold(`Generate Theme`));

const getName = await text({
  message: `Enter a name for your theme.`,
  placeholder: `Sol WP`,
  initialValue: ``,
  validate(value) {
    if (htmlRegex.test(value)) return `Theme Name cannot contain HTML`;
  },
});

if (isCancel(getName)) {
  process.exit(0);
}

const getDirectory = await text({
  message: `Enter theme folder name.`,
  placeholder: `leave blank and we'll generate one based off your theme name`,
  initialValue: ``,
  validate(value) {
    if (htmlRegex.test(value)) return `Folder Name cannot contain HTML`;
    if (spacesRegex.test(value)) return `Folder Name cannot contain spaces`;
  },
});

if (isCancel(getDirectory)) {
  process.exit(0);
}

const getAuthor = await text({
  message: `Provide an author (optional)`,
  placeholder: `Your name here`,
});

if (isCancel(getAuthor)) {
  process.exit(0);
}

const getDescription = await text({
  message: `Provide a description (optional)`,
  placeholder: `Your theme description here`,
});

if (isCancel(getDescription)) {
  process.exit(0);
}

const getVersion = await text({
  message: `Provide a version (optional):`,
  placeholder: `1.0.0`,
});

if (isCancel(getVersion)) {
  process.exit(0);
}

const cssOption = await select({
  message: `What CSS tools would you like?`,
  options: [
    { value: "tailwind", label: "Tailwind" },
    { value: "uno", label: "UnoCSS" },
    { value: "sass", label: "Sass" },
    { value: "postcss", label: "PostCSS" },
    { value: "none", label: "None, I'll figure it out my own damn self." },
  ],
});

if (isCancel(cssOption)) {
  process.exit(0);
}

const ts = await confirm({
  message: `Would you to use TypeScript?`,
});

if (isCancel(ts)) {
  process.exit(0);
}

const name = getName ? (getName as string) : "Sol WP";

const directory = getDirectory
  ? formatFolderName(getDirectory)
  : formatFolderName(name);

const author = getAuthor ? (getAuthor as string) : "Sol WPer";

const description = getDescription
  ? (getDescription as string)
  : "Theme description";

const version = getVersion ? (getVersion as string) : "1.0.0";

const answers: Recipe = {
  theme: {
    name,
    folder: directory,
    author,
    description,
    version,
  },
  tooling: {
    css: cssOptions.filter((o) => o.name === cssOption)[0],
    ts: ts,
  },
};

const cssFile = generateCssFile({
  name: answers.theme.name,
  author: answers.theme.author,
  description: answers.theme.description,
  version: answers.theme.version,
});

const phpFile = generateIndexFile();

createFolder(answers.theme.folder);

createFile({
  directoryPath: `wp/themes/${answers.theme.folder}`,
  fileName: cssFile.name,
  fileContent: cssFile.content,
});

createFile({
  directoryPath: `wp/themes/${answers.theme.folder}`,
  fileName: phpFile.name,
  fileContent: phpFile.content,
});

editWpEnv({ wpEnvFile: `.wp-env.json`, directory: answers.theme.folder });

// Finalize setup and display outro
async function setupTooling() {
  const functionFile = generateFunctionsFile();
  try {
    switch (cssOption) {
      case "tailwind":
        await configureCssTool({
          functionFile,
          theme: answers.theme,
          option: answers.tooling.css,
          scripts: [
            {
              key: "tailwind",
              value: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${answers.theme.folder}/css/tailwind.css`,
            },
            {
              key: "tailwind:prod",
              value: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${answers.theme.folder}/css/tailwind.css`,
            },
            {
              key: "tailwind:watch",
              value: `tailwindcss -i ./src/css/tailwind.css -o ./wp/themes/${answers.theme.folder}/css/tailwind.css --watch`,
            },
          ],
        });

        const tailwindConfigFile = generateTailwindConfigFile({
          content: [
            `wp/themes/${answers.theme.folder}/**/*.php`,
            `src/ts/**/*.{js, jsx, ts, tsx}`,
          ],
        });

        const tailwindCssFile = generateTailwindCssFile();

        const tailwindPrettierRcFile = generatePrettierRcFile();

        createFile({
          directoryPath: `.`,
          fileName: tailwindPrettierRcFile.name,
          fileContent: tailwindPrettierRcFile.content,
        });

        const editedTailwindPrettierRcFile = editJson({
          filePath: ".",
          fileName: ".prettierrc",
          edits: { key: "plugins", value: ["prettier-plugin-tailwindcss"] },
        });

        createFile({
          directoryPath: `.`,
          fileName: tailwindConfigFile.name,
          fileContent: tailwindConfigFile.content,
        });

        createFile({
          directoryPath: `src/css`,
          fileName: tailwindCssFile.name,
          fileContent: tailwindCssFile.content,
        });

        createFile({
          directoryPath: `.`,
          fileName: editedTailwindPrettierRcFile.name,
          fileContent: editedTailwindPrettierRcFile.content,
        });

        await executeCommand("npm", [
          "install",
          `${answers.tooling.css.packageName}`,
          "prettier",
          "prettier-plugin-tailwindcss",
          "--save-dev",
        ]);
        break;
      case "uno":
        await configureCssTool({
          functionFile,
          theme: answers.theme,
          option: answers.tooling.css,
          scripts: [
            { key: "uno", value: "unocss" },
            { key: "uno:prod", value: "unocss --minify" },
            { key: "uno:watch", value: "unocss --watch" },
          ],
        });

        const unoConfigFile = generateUnoConfigFile({
          content: [
            `wp/themes/${answers.theme.folder}/**/*.php`,
            `src/ts/**/*.{js, jsx, ts, tsx}`,
          ],
          outFile: `wp/themes/${answers.theme.folder}/css/uno.css`,
        });

        createFile({
          directoryPath: ".",
          fileName: unoConfigFile.name,
          fileContent: unoConfigFile.content,
        });

        await executeCommand("npm", [
          "install",
          `${answers.tooling.css.packageName}`,
          "--save-dev",
        ]);
        break;
      case "sass":
        await configureCssTool({
          functionFile,
          theme: answers.theme,
          option: answers.tooling.css,
          cssRegisterName: "styles",
          cssFileName: "styles",
          scripts: [
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
              value: `sass src/css:wp/themes/${answers.theme.folder}/css --load-path=node_modules --style=expanded --embed-source-map --watch`,
            },
            {
              key: "sass:prettier",
              value: 'prettier "src/css/**/*.scss" --write',
            },
            {
              key: "sass:prettier:watch",
              value:
                'onchange "src/css/**/*.scss" -- prettier --write --ignore-unknown {{changed}}',
            },
            {
              key: "stylelint",
              value: `stylelint src/css/**/*.scss`,
            },
            {
              key: "stylelint:watch",
              value: `onchange src/css/**/*.scss -- npm run stylelint`,
            },
            {
              key: "style:watch",
              value:
                'concurrently "npm run sass:watch" "npm run sass:prettier:watch" "npm run stylelint:watch"',
            },
          ],
        });

        const sassConfigFile = generateSassConfigFile({
          themeFolder: answers.theme.folder,
        });

        const sassStylelintFile = generateSassStylelintFile();

        const sassPrettierRcFile = generatePrettierRcFile();

        createFile({
          directoryPath: `.`,
          fileName: sassPrettierRcFile.name,
          fileContent: sassPrettierRcFile.content,
        });

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
          directoryPath: "src/css",
          fileName: "styles.scss",
          fileContent: "@use 'scss-reset/reset';",
        });

        await executeCommand("npm", [
          "install",
          `${answers.tooling.css.packageName}`,
          `scss-reset`,
          `prettier`,
          `stylelint`,
          `stylelint-config-standard-scss`,
          `onchange`,
          `concurrently`,
          "--save-dev",
        ]);
        break;
      case "postcss":
        await configureCssTool({
          functionFile,
          theme: answers.theme,
          option: answers.tooling.css,
          cssRegisterName: "styles",
          cssFileName: "styles",
          scripts: [
            {
              key: `css`,
              value: `postcss src/css/**/*.css --dir wp/themes/${answers.theme.folder}/css --config .postcssrc.json`,
            },
            {
              key: `css:prod`,
              value: `postcss src/css/**/*.css --dir wp/themes/${answers.theme.folder}/css --config .postcssrc.prod.json`,
            },
            {
              key: `css:watch`,
              value: `postcss src/css/**/*.css --dir wp/themes/${answers.theme.folder}/css --config .postcssrc.json --watch`,
            },
          ],
        });

        const postCssConfigFile = generatePostCssConfigFile();

        const postCssProdConfigFile = generatePostCssProdConfigFile();

        createFile({
          directoryPath: ".",
          fileName: postCssConfigFile.name,
          fileContent: postCssConfigFile.content,
        });

        createFile({
          directoryPath: ".",
          fileName: postCssProdConfigFile.name,
          fileContent: postCssProdConfigFile.content,
        });

        createFile({
          directoryPath: "src/css",
          fileName: "styles.css",
          fileContent: '@import "normalize.css";',
        });

        const postCssPrettierRcFile = generatePrettierRcFile();

        createFile({
          directoryPath: `.`,
          fileName: postCssPrettierRcFile.name,
          fileContent: postCssPrettierRcFile.content,
        });

        const editedPostCssPrettierConfigRcFile = editJson({
          filePath: ".",
          fileName: ".prettierrc",
          edits: { key: "plugins", value: ["prettier-plugin-standard"] },
        });

        createFile({
          directoryPath: `.`,
          fileName: editedPostCssPrettierConfigRcFile.name,
          fileContent: editedPostCssPrettierConfigRcFile.content,
        });

        await executeCommand("npm", [
          "install",
          `${answers.tooling.css.packageName}`,
          `postcss-cli`,
          `autoprefixer`,
          `postcss-import`,
          `normalize.css`,
          `postcss-nested`,
          `cssnano`,
          `prettier`,
          `stylelint`,
          `stylelint-config-standard`,
          `onchange`,
          `concurrently`,
          "--save-dev",
        ]);
        break;
      case "none":
        console.log(
          formatMessage({ message: `Alright, good luck!`, color: "yellow" })
        );
        break;
    }
  } catch (error) {
    console.error(
      formatMessage({ message: `An error occurred: ${error}`, color: "red" })
    );
  }
  outro(green(bold("Your theme has been generated!")));
}

setupTooling();
