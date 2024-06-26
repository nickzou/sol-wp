import setupPostCss from "../postcss/setupPostCss/setupPostCss";
import setupSass from "../sass/setupSass/setupSass";
import setupTailwind from "../tailwind/setupTailwind/setupTailwind";
import setupUno from "../uno/setupUno/setupUno";
import setupNone from "../none/setupNone/setupNone";
import { SetupCss } from "@utils/types/SetupCss";

const setupCssOption = async ({registerAssets, answers, npmPackages, packageScripts, watchScripts, devScripts, prodScripts, prettierConfigOptions}:SetupCss) => {
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
            await optionFunction({registerAssets, answers, npmPackages, packageScripts, watchScripts, devScripts, prodScripts, prettierConfigOptions});
        }
    } catch (error) {
        throw error;
    }
};

export default setupCssOption;