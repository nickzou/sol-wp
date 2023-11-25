import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateCaptureWpHeadFunctionFile = generatePhpFunctionFile({
    name: "capture_wp_head",
    fileName: "capture_wp_head",
    functionBody: ` ob_start();
    wp_head();
    return ob_get_clean();`
});

export default generateCaptureWpHeadFunctionFile;