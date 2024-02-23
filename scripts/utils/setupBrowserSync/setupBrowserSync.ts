import { Recipe } from "@utils/types/Recipe";
import { PackageScript } from "@utils/vars/packageScripts";

type SetupBrowserSync = {
    npmPackages: string[];
    packageScripts: PackageScript[];
};

const setupBrowserSync = async ({npmPackages, packageScripts}:SetupBrowserSync) => {
    npmPackages.push(...["browser-sync"]);

    packageScripts.push(...[{
        key: "browsersync",
        value: "browser-sync start --proxy \"localhost:8888\" --files \"wp/**/*\""
    }]);
};

export default setupBrowserSync;