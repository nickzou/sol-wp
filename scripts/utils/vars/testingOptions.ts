import { TestingOption } from "@utils/types/TestingOption";

const testingOptions: TestingOption[] = [
    { 
        name: "phpunit",
        packageName: ["phpunit/phpunit"],
        language: 'php'
    },
    {
        name: "wp_mock",
        packageName: ["10up/wp_mock"],
        language: 'php'
    },
    {
        name: "jest",
        packageName: ["@types/jest", "jest", "ts-jest", "babel-jest"],
        language: 'javascript'
    }
];

export default testingOptions;