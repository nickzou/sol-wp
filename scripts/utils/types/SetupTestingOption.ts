import { PackageScript } from "@utils/vars/packageScripts";
import { Recipe } from "./Recipe"

export type SetupTestingOption = {
    answers: Recipe;
    packages: string[];
    packageScripts?: PackageScript[];
}