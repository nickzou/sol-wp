import { File } from "@utils/types/File";

const generatePostCssConfigFile = (): File => {
  const content = `{
  "plugins": {
    "autoprefixer": {},
    "postcss-nested": {},
    "postcss-normalze": {},
    "cssnano": {}
  }
}`;

  return {
    name: ".postcssrc.json",
    content,
  };
};

export default generatePostCssConfigFile;
