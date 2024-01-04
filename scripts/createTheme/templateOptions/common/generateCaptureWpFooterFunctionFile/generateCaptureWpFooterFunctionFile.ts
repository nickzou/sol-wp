import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateCaptureWpFooterFunctionFile = generatePhpFunctionFile({
    name: "capture_wp_footer",
    fileName: "capture_wp_footer",
    functionBody: ` ob_start();
    wp_footer();
    return ob_get_clean();`
});

export default generateCaptureWpFooterFunctionFile;