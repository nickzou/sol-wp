import { File } from "@utils/types/File";

const generatePostCssConfigFile = (): File => {
  const content = `{
  "plugins": {
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-nested": {}
  }
}`;

  return {
    name: ".postcssrc.json",
    content,
  };
};

export default generatePostCssConfigFile;
