import { File } from "@utils/types/File";

const generatePostCssProdConfigFile = (): File => {
  const content = `{
  "plugins": {
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-nested": {},
    "cssnano": {}
  }
}`;

  return {
    name: ".postcssrc.prod.json",
    content,
  };
};

export default generatePostCssProdConfigFile;
