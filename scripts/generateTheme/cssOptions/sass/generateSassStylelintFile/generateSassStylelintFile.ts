import { File } from "@utils/types/File";

const generateStylelintFile = ():File => {
  const content = `{
  "extends": ["stylelint-config-standard-scss"]
}`;

  return {
    name: '.stylelintrc.json',
    content
  }
};

export default generateStylelintFile;