import { SetupNpmPackages } from "./SetupNpmPackages";
import { SetupPhpPackages } from "./SetupPhpPackages";

export type SetupTesting = SetupNpmPackages & SetupPhpPackages;