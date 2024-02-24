export type esLintConfigOptions = {
    extendsArr: string[];
    plugins: string[];
    parser: string;
};

const esLintConfigOptions:esLintConfigOptions = {
    extendsArr: [],
    plugins: [],
    parser: "",
};

export default esLintConfigOptions;