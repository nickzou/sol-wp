import { Recipe } from "@utils/types/Recipe";
import { text, select, confirm, isCancel } from "@clack/prompts";
import formatFolderName from "@utils/formatFolderName/formatFolderName";
import cssOptions from "@utils/vars/cssOptions";
import phpOptions from "@utils/vars/phpOptions";

const getAnswers = async ():Promise<Recipe> => {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    const spacesRegex = /\s+/;

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

    const phpOption = await select({
        message: "What PHP Templating System would you like?",
        options: [
          { value: "twig", label: "Twig" },
          { value: "latte", label: "Latte" },
          { value: "bladeone", label: "BladeOne" },
          { value: "plate", label: "Plate" },
          { value: "smarty", label: "Smarty" },
          { value: "mustache", label: "Mustache" },
          { value: "none", label: "None, PHP is a templating engine!" },
        ],
    });
      
    if (isCancel(phpOption)) {
        process.exit(0);
    }

    const name = getName as string ?? 'Sol WP';
    const directory = getDirectory as string ? formatFolderName(getDirectory) : formatFolderName(name);
    const author = getAuthor as string ?? 'Sol Wper';
    const description = getDescription as string ?? 'Theme Description';
    const version = getVersion as string ?? '1.0.0'; 
    const css = cssOption as string;
    const php = phpOption as string;

    return {
        theme: {
            name,
            folder: directory,
            author,
            description,
            version,
        },
        tooling: {
            css: cssOptions.filter((o) => o.name === css)[0],
            ts: ts,
            php: phpOptions.filter((o) => o.name === php)[0]
        }
    }
};

export default getAnswers;