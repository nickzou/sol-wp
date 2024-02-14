import { File } from "@utils/types/File";

const generateJsConfig = ():File => {
    const content = `import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\\.tsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
`;

    return {
        name: 'jest.config.ts',
        content
    }
};

export default generateJsConfig;