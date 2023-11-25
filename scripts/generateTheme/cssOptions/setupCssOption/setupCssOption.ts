import formatMessage from "@utils/formatMessage/formatMessage";
import setupPostCss from "../postcss/setupPostCss/setupPostCss";
import setupSass from "../sass/setupSass/setupSass";
import setupTailwind from "../tailwind/setupTailwind/setupTailwind";
import setupUno from "../uno/setupUno/setupUno";
import { SetupCss } from "@utils/types/SetupCss";
import styleSolutionEnqueuer from "@generateTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";

const setupCssOption = async ({functionFile, answers, npmPackages, packageScripts, prettierConfigOptions}:SetupCss) => {
    const cssOptions = {
        tailwind: setupTailwind,
        uno: setupUno,
        sass: setupSass,
        postcss: setupPostCss,
        none: async ({functionFile, answers}:SetupCss) => {
            await styleSolutionEnqueuer({
                functionFile,
                theme: answers.theme,
                option: answers.tooling.css,
                cssRegisterName: "styles",
                cssFileName: "styles",
              });
            console.log(formatMessage({message: `Alright, good luck!`, color: 'yellow'}));
        }
    };

    try {
        const optionName = answers.tooling.css.name;
        const optionFunction = cssOptions[optionName];

        if(optionFunction) {
            await optionFunction({functionFile, answers, npmPackages, packageScripts, prettierConfigOptions});
        }
    } catch (error) {
        throw error;
    }
};

export default setupCssOption;