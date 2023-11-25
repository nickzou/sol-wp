import styleSolutionEnqueuer from "@generateTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import createDirectory from "@utils/createDirectory/createDirectory";
import createFile from "@utils/createFile/createFile";
import packageScripts from "@utils/vars/packageScripts";
import generatePostCssConfigFile from "../generatePostCssConfigFile/generatePostCssConfigFile";
import generatePostCssProdConfigFile from "../generatePostCssProdConfigFile/generatePostCssProdConfigFile";
import prettierConfigOptions from "@utils/vars/prettierConfigOptions";
import npmPackages from "@utils/vars/npmPackages";
import { SetupCss } from "@utils/types/SetupCSS";

const setupPostCss = async ({functionFile, answers}:SetupCss) => {
      await styleSolutionEnqueuer({
        functionFile,
        theme: answers.theme,
        option: answers.tooling.css,
        cssRegisterName: "styles",
        cssFileName: "styles",
      });

      createDirectory({
        location: `src/themes/${answers.theme.directory}`,
        directoryName: `css`,
      });

      packageScripts.push(...[
        {
          key: `css`,
          value: `postcss src/themes/${answers.theme.directory}/css/**/*.css --dir wp/themes/${answers.theme.directory}/css --config .postcssrc.json`,
        },
        {
          key: `css:prod`,
          value: `postcss src/themes/${answers.theme.directory}/css/**/*.css --dir wp/themes/${answers.theme.directory}/css --config .postcssrc.prod.json`,
        },
        {
          key: `css:watch`,
          value: `postcss src/themes/${answers.theme.directory}/css/**/*.css --dir wp/themes/${answers.theme.directory}/css --config .postcssrc.json --watch`,
        },
      ]);

      const postCssConfigFile = generatePostCssConfigFile();

      const postCssProdConfigFile = generatePostCssProdConfigFile();

      createFile({
        directoryPath: ".",
        fileName: postCssConfigFile.name,
        fileContent: postCssConfigFile.content,
      });

      createFile({
        directoryPath: ".",
        fileName: postCssProdConfigFile.name,
        fileContent: postCssProdConfigFile.content,
      });

      createFile({
        directoryPath: `src/themes/${answers.theme.directory}/css`,
        fileName: "styles.css",
        fileContent: '@import "normalize.css";',
      });

      prettierConfigOptions.plugins.push(...[
        "prettier-plugin-standard",
      ]);

      npmPackages.push(...[
        `${answers.tooling.css.packageName}`,
        `postcss-cli`,
        `autoprefixer`,
        `postcss-import`,
        `normalize.css`,
        `postcss-nested`,
        `cssnano`,
        `prettier`,
        `stylelint`,
        `stylelint-config-standard`,
        `onchange`,
        `concurrently`,
      ]);
};

export default setupPostCss;