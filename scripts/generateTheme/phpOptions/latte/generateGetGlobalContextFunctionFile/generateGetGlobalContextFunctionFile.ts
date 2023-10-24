import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";


const generateGetGlobalContextFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "get_global_context",
        functionBody: `  global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
    
    return compact('posts', 'post', 'wp_did_header', 'wp_query', 'wp_rewrite', 'wpdb', 'wp_version', 'wp', 'id', 'comment', 'user_ID');
        `
    });
};

export default generateGetGlobalContextFunctionFile;