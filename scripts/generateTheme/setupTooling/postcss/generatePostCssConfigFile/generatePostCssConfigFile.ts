import { File } from "@utils/types/File";

const generatePostCssConfigFile = (): File => {
  const content = `{
  "plugins": {
    "autoprefixer": {},
    "postcess-nested: {},
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
    name: "postcss.config.json",
    content,
  };
};

export default generatePostCssConfigFile;
