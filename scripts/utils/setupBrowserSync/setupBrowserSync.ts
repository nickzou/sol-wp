import { PackageScript } from "@utils/vars/packageScripts";

type SetupBrowserSync = {
    npmPackages: string[];
    packageScripts: PackageScript[];
    watchScripts: string[];
};

const setupBrowserSync = async ({npmPackages, packageScripts, watchScripts}:SetupBrowserSync) => {
    npmPackages.push(...["browser-sync"]);

    packageScripts.push(...[{
        key: "browsersync",
        value: "browser-sync start --proxy \"localhost:8888\" --files \"wp/**/*\""
    }]);

    watchScripts.push("'npm run browsersync'");
};

export default setupBrowserSync;