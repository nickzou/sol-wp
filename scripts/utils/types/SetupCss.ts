import { registerAsset } from "@utils/vars/registerAssets";
import { Recipe } from "./Recipe";
import { PackageScript } from "@utils/vars/packageScripts";
import { PrettierConfigOptions } from "@utils/vars/prettierConfigOptions";

export type SetupCss = {
    registerAssets: registerAsset[];
    answers: Recipe;
    npmPackages?: string[];
    packageScripts?: PackageScript[];
    watchScripts: string[];
    prettierConfigOptions?:PrettierConfigOptions;
};