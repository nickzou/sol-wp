import { File } from "@utils/types/File";

const generateTsConfigFile = (): File => {
  const content = `{\n  "compilerOptions": {\n    "esModuleInterop": true,\n    "forceConsistentCasingInFileNames":true,\n    "skipLibCheck":true,\n   "target": "ES6",\n   "verbatimModuleSyntax":true,\n    "allowJs":true,\n   "resolveJsonModule":true,\n   "moduleDetection":"force",\n    "strict":true,\n    "noUncheckedIndexedAccess":true,\n    "module": "NodeNext",\n   "moduleResolution": "Bundler",\n    "noEmit": true,\n   "lib":["es2022","dom"],\n  }\n}`;
  return {
    name: "tsconfig.json",
    content,
  };
};

export default generateTsConfigFile;
