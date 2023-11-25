import setupPostCss from "../postcss/setupPostCss/setupPostCss";
import setupSass from "../sass/setupSass/setupSass";
import setupTailwind from "../tailwind/setupTailwind/setupTailwind";
import setupUno from "../uno/setupUno/setupUno";
import setupNone from "../none/setupNone/setupNone";
import { SetupCss } from "@utils/types/SetupCss";

const setupCssOption = async ({functionFile, answers, npmPackages, packageScripts, prettierConfigOptions}:SetupCss) => {
    const cssOptions = {
        tailwind: setupTailwind,
        uno: setupUno,
        sass: setupSass,
        postcss: setupPostCss,
        none: setupNone
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