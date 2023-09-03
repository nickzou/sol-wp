import { intro, outro, text } from "@clack/prompts";
import createFolder from "./createFolder/createFolder";
import createCssFile from "./createCssFile/createCssFile";

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

const getVersion = await text({
  message: `Provide a version (optional):`,
  placeholder: `1.0.0`,
});

const name = getName ? (getName as string) : "Sol WP";

const directory = getDirectory ? (getDirectory as string) : "sol-wp";

createFolder(directory);

//const cssFile = createCssFile(name as string);

//console.log(name);

outro(`Your theme has been generated!`);
