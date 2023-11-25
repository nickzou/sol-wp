import { SetupTemplate } from "@utils/types/SetupTemplate";
import setupTwig from "../twig/setupTwig/setupTwig";
import setupLatte from "../latte/setupLatte/setupLatte";

const setupTemplateOption = async ({answers, composerPackages}:SetupTemplate) => {
    const templateOptions = {
        twig: setupTwig,
        latte: setupLatte
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