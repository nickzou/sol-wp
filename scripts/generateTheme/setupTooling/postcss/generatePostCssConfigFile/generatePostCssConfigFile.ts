import { File } from "@utils/types/File";

const generatePostCssConfigFile = (): File => {
  const content = `{
  "plugins": {
    "autoprefixer": {},
    "postcss-nested": {},
    "postcss-autoreset": {
      "reset": {
        "*": {
          "all": "initial",
          "box-sizing": "border-box"
        }
      }
    },
    "cssnano": {}
  }
}`;

  return {
    name: ".postcssrc.json",
    content,
  };
};

export default generatePostCssConfigFile;
