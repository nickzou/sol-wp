import { TestingOptions } from "@utils/types/TestingOptions";

const reduceTestingOptions= (options:string[]):TestingOptions => {
    const initialOptions: TestingOptions = {
        phpunit: false,
        cypress: false,
        playwright: false
    };

    return options.reduce<TestingOptions>((acc, option) => {
        if (Object.keys(initialOptions).includes(option)) {
            acc[option as keyof TestingOptions] = true;
        }
        return acc;
    }, initialOptions);
};

export default reduceTestingOptions;

