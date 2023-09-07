import { intro, outro, text, select } from "@clack/prompts";
import executeCommand from "../utils/executeCommand/executeCommand";
import formatMessage from "./formatMessage/formatMessage";
import createFolder from "../utils/createFolder/createFolder";
import generateCssFile from "./generateCssFile/generateCssFile";
import generatePhpFile from "./generateIndexFile/generateIndexFile";
import createFile from "../utils/createFile/createFile";
import editWpEnv from "./editWpEnv/editWpEnv";
import createTailwindConfig from "./setupTooling/tailwind/createTailwindConfig/createTailwindConfig";
import { bold, green } from "colorette";
import generateTailwindCssFile from "./setupTooling/tailwind/generateTailwindCssFile/generateTailwindCssFile";
import addTailwindNpmScripts from "./setupTooling/tailwind/addTailwindNpmScripts/addTailwindNpmScripts";
import generateFunctionsFile from "./generateFunctionsFile/generateFunctionsFile";
import generatePhpFunctionFile from "./generatePhpFunctionFile/generatePhpFunctionFile";
import { appendFile } from "fs";
import appendToFunctionsFile from "./appendToFunctionsFile/appendToFunctionsFile";

const htmlRegex = /<\/?[a-z][\s\S]*>/i;
const spacesRegex = /\s+/;

intro(`Generate Theme`);

const getName = await text({
  message: `Enter a name for your theme.`,
  placeholder: `Sol WP`,
  initialValue: ``,
  validate(value) {
    if (htmlRegex.test(value)) return `Theme Name cannot contain HTML`;
  },
});

const getDirectory = await text({
  message: `Enter theme folder name.`,
  placeholder: `leave blank and we'll generate one based off your theme name`,
  initialValue: ``,
  validate(value) {
    if (htmlRegex.test(value)) return `Folder Name cannot contain HTML`;
    if (spacesRegex.test(value)) return `Folder Name cannot contain spaces`;
  },
});

const getAuthor = await text({
  message: `Provide an author (optional)`,
  placeholder: `Your name here`,
});

const getDescription = await text({
  message: `Provide a description (optional)`,
  placeholder: `Your theme description here`,
});

const getVersion = await text({
  message: `Provide a version (optional):`,
  placeholder: `1.0.0`,
});

const setupTooling = await select({
  message: `Do you want us to configure the tooling for theme development?`,
  options: [
    { value: true, label: `Yes, please!` },
    { value: false, label: `No, thank you. I'll take it from here.` },
  ],
});

const name = getName ? (getName as string) : "Sol WP";

const directory = getDirectory ? (getDirectory as string) : "sol-wp";

const author = getAuthor ? (getAuthor as string) : "Sol WPer";

const description = getDescription
  ? (getDescription as string)
  : "Theme description";

const version = getVersion ? (getVersion as string) : "1.0.0";

const cssFile = generateCssFile({ name, author, description, version });

const phpFile = generatePhpFile();

createFolder(directory);

createFile({
  directoryPath: `wp/themes/${directory}`,
  fileName: cssFile.name,
  fileContent: cssFile.content,
});

createFile({
  directoryPath: `wp/themes/${directory}`,
  fileName: phpFile.name,
  fileContent: phpFile.content,
});

editWpEnv({ wpEnvFile: `.wp-env.json`, directory: directory });

// Finalize setup and display outro
async function finalizeSetup() {
  if (setupTooling) {
    try {
      const functionFile = generateFunctionsFile();

      const enqueueAssetsFile = generatePhpFunctionFile({
        name: "enqueue_assets",
        functionBody: `wp_enqueue_style( 'tailwind', get_template_directory_uri() . '/css/tailwind.css', [], '1.0.0', 'all' );`,
      });

      createFolder(`${directory}/functions`);
      createFolder(`${directory}/css`);

      createFile({
        directoryPath: `wp/themes/${directory}`,
        fileName: functionFile.name,
        fileContent: functionFile.content,
      });

      await executeCommand("npm", ["install", "tailwindcss", "--save-dev"]);

      createTailwindConfig({ content: [`wp/themes/${directory}/**/*.php`] });

      const tailwindCssFile = generateTailwindCssFile();

      createFile({
        directoryPath: `src/css/`,
        fileName: tailwindCssFile.name,
        fileContent: tailwindCssFile.content,
      });

      createFile({
        directoryPath: `wp/themes/${directory}/functions`,
        fileName: enqueueAssetsFile.name,
        fileContent: `${enqueueAssetsFile.content} \nadd_action( 'wp_enqueue_scripts', 'enqueue_assets' );`,
      });

      appendToFunctionsFile({
        themeFolder: directory,
        functionName: enqueueAssetsFile.functionName,
      });

      addTailwindNpmScripts();
    } catch (error) {
      console.error(
        formatMessage({ message: `An error occurred: ${error}`, color: "red" })
      );
    }
  }
  outro(green(bold("Your theme has been generated!")));
}

finalizeSetup();
