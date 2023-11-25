import { File } from "@utils/types/File";
import camelCase from "@utils/camelCase/camelCase";
import dedent from 'dedent';

interface generateComposerFile {
  themeFolder: string;
}

const generateComposerFile = ({ themeFolder }: generateComposerFile): File => {
  const content = dedent(`{
    "name": "nickzou/${themeFolder}",
    "description": "A modern toolchain for WordPress development.",
    "type": "library",
    "license": "MIT",
    "autoload": {
      "psr-4": {
        "wpSol\\\\${camelCase(themeFolder)}\\\\": "./"
      }
    },
    "authors": [
      {
        "name": "Nick Zou",
        "email": "contact@nickzou.com"
      }
    ],
    "minimum-stability": "dev",
    "require": {}
}`);

  return {
    name: "composer.json",
    content,
  };
};

export default generateComposerFile;
