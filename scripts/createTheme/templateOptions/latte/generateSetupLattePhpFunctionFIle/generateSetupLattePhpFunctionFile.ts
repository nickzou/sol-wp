import generatePhpFunctionFile from "createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupLattePhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_latte",
        functionBody: `  global $latte; 
    $latte = new Latte\\Engine;
    $latte->setTempDirectory(get_template_directory() . '/temp');
    `
    });
};

export default generateSetupLattePhpFunctionFile;