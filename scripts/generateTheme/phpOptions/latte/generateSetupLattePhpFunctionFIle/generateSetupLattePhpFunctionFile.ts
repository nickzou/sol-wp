import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupLattePhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_latte",
        functionBody: ` $latte = new Latte\Engine;
    $latte->setTempDirectory(get_template_directory() . '/temp');
    `
    });
};

export default generateSetupLattePhpFunctionFile;