import { File } from "./File"
import { Recipe } from "./Recipe";
import { PackageScript } from "@utils/vars/packageScripts";
import { PrettierConfigOptions } from "@utils/vars/prettierConfigOptions";

export type SetupCss = {
    functionFile: File;
    answers: Recipe;
    npmPackages: string[];
    packageScripts: PackageScript[];
    prettierConfigOptions?:PrettierConfigOptions;
};