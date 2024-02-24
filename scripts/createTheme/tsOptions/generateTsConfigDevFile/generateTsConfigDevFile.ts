import { File } from "@utils/types/File";

const generateTsConfigDevFile = (): File => {
  const content = `{
  "compilerOptions": {
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames":true,
    "skipLibCheck":true,
    "target": "ESNext",
    "verbatimModuleSyntax":false,
    "allowJs":true,
    "resolveJsonModule":true,
    "moduleDetection":"force",
    "strict":true,
    "noUncheckedIndexedAccess":true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noEmit": true,
    "lib":["es2022","dom"],
  }
}`;
  return {
    name: "tsconfig.dev.json",
    content,
  };
};

export default generateTsConfigDevFile;
