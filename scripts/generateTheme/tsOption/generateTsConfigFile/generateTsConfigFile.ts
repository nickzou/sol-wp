import { File } from "@utils/types/File";

const generateTsConfigFile = (): File => {
  const content = `{\n  "compilerOptions": {\n    "module": "NodeNext",\n   "moduleResolution": "NodeNext",\n   "target": "ES6",\n    "esModuleInterop": true,\n    "noEmit": true\n  }\n}`;
  return {
    name: "tsconfig.json",
    content,
  };
};

export default generateTsConfigFile;
