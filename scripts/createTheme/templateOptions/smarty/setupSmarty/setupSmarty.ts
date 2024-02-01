import { SetupTemplate } from "@utils/types/SetupTemplate";

const setupSmarty = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "smarty/smarty"
    ]);
};

export default setupSmarty;