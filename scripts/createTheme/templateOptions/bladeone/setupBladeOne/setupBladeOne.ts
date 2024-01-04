import { SetupTemplate } from "@utils/types/SetupTemplate";

const setupBladeOne = async ({answers, composerPackages}:SetupTemplate) => {
    composerPackages.push(...[
        "eftec/bladeone"
    ]);
};

export default setupBladeOne;