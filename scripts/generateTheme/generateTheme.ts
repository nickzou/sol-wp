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
import appendToFunctionsFile from "./appendToFunctionsFile/appendToFunctionsFile";
import { Recipe } from "../utils/types/Recipe";
import configureCssTool from "../utils/configureCssTool/configureCssTool";
import cssOptions from "../utils/vars/cssOptions";

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

const setUpTooling = await select({
  message: `Do you want us to configure the tooling for theme development?`,
  options: [
    { value: true, label: `Yes, please!` },
    { value: false, label: `No, thank you. I'll take it from here.` },
  ],
});

const cssOption = await select({
  message: `What CSS tools would you like?`,
  options: [
    { value: "tailwind", label: "Tailwind" },
    { value: "uno", label: "UnoCSS" },
    { value: "sass", label: "Sass" },
    { value: "postcss", label: "PostCSS" },
    { value: "css", label: "CSS" },
    { value: "none", label: "None, I'll figure it out my own damn self." },
  ],
});

const name = getName ? (getName as string) : "Sol WP";

const directory = getDirectory ? (getDirectory as string) : "sol-wp";

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
  setUpTooling: setUpTooling as boolean, //fix this later
  tooling: {
    css: cssOptions.filter((o) => o.name === cssOption)[0], //fix this later
    ts: true,
  },
};

const cssFile = generateCssFile({
  name: answers.theme.name,
  author: answers.theme.author,
  description: answers.theme.description,
  version: answers.theme.version,
});

const phpFile = generatePhpFile();

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
async function finalizeSetup() {
  if (answers.setUpTooling && cssOption === "tailwind") {
    try {
      const functionFile = generateFunctionsFile();
      await configureCssTool({
        functionFile,
        theme: answers.theme,
        option: answers.tooling.css,
      });
    } catch (error) {
      console.error(
        formatMessage({ message: `An error occurred: ${error}`, color: "red" })
      );
    }
  } else if (answers.setUpTooling && cssOption === "uno") {
    try {
      console.log("unocss coming soon!");
    } catch (error) {
      console.error(
        formatMessage({ message: `An error occurred: ${error}`, color: "red" })
      );
    }
  }
  outro(green(bold("Your theme has been generated!")));
}

finalizeSetup();
