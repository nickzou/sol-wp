import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupBladeOneFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_bladeone",
        functionBody: ` global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
        $views = __DIR__ . '/views';
        $cache = __DIR__ . '/cache';
        $blade = new eftec\\bladeone\\BladeOne($views,$cache);
        global $views;
        global $cache;
        global $blade;`
    })
};

export default generateSetupBladeOneFunctionFile;