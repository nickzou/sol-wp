import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupBladeOneFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_bladeone",
        functionBody: ` global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;`
    })
};

export default generateSetupBladeOneFunctionFile;