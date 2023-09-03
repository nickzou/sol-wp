import { intro, outro, text } from "@clack/prompts";
import createFolder from "./createFolder/createFolder";

const htmlRegex = /<\/?[a-z][\s\S]*>/i;
const spacesRegex = /\s+/;

intro(`Generate Theme`);

const name = await text({
  message: `Enter a name for your theme.`,
  placeholder: `Sol WP`,
  initialValue: ``,
  validate(value) {
    if (htmlRegex.test(value)) return `Theme Name cannot contain HTML`;
  },
});

const directory = await text({
  message: `Enter theme folder name.`,
  placeholder: `leave blank and we'll generate one based off your theme name`,
  initialValue: ``,
  validate(value) {
    if (htmlRegex.test(value)) return `Folder Name cannot contain HTML`;
    if (spacesRegex.test(value)) return `Folder Name cannot contain spaces`;
  },
});

const author = await text({
  message: `Provide an author (optional)`,
  placeholder: `Your name here`,
});

const version = await text({
  message: `Provide a version (optional):`,
  placeholder: `1.0.0`,
});

createFolder(directory as string);

outro(`Your theme has been generated!`);
