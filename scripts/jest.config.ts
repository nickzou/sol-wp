import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "^@createTheme/(.*)$": "<rootDir>/createTheme/$1",
  },
};

export default config;
