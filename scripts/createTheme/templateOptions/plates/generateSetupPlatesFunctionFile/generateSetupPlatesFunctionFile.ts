import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupPlatesFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_plates",
        functionBody: `
    global $views;
    $views = new League\\Plates\\Engine(get_template_directory() . '/views');
    `
    });
};

export default generateSetupPlatesFunctionFile;