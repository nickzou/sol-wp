import { TestingOption } from "@utils/types/TestingOption";

const testingOptions: TestingOption[] = [
    { 
        name: "phpunit",
        packageName: [
            "phpunit/phpunit",
            "10up/wp_mock"
        ],
        language: 'php' }
];

export default testingOptions;