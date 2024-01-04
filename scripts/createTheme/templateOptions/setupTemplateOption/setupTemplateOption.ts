import { SetupTemplate } from "@utils/types/SetupTemplate";
import setupTwig from "../twig/setupTwig/setupTwig";
import setupLatte from "../latte/setupLatte/setupLatte";
import setupNone from "../none/setupNone";
import setupBladeOne from "../bladeone/setupBladeOne/setupBladeOne";

const setupTemplateOption = async ({answers, composerPackages}:SetupTemplate) => {
    const templateOptions = {
        twig: setupTwig,
        latte: setupLatte,
        none: setupNone,
        bladeone: setupBladeOne
    };

    try {
        const optionName = answers.tooling.template.name;
        const optionFunction = templateOptions[optionName];

        if(optionFunction) {
            await optionFunction({answers, composerPackages});
        }
    } catch (error) {
        throw error;
    }
};

export default setupTemplateOption;