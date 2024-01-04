import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupBladeOneFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_bladeone",
        functionBody: ` global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
        global $views = __DIR__ . '/views';
        global $cache = __DIR__ . '/cache';
        global $blade = new eftec\\bladeone\\BladeOne($views,$cache);`
    })
};

export default generateSetupBladeOneFunctionFile;