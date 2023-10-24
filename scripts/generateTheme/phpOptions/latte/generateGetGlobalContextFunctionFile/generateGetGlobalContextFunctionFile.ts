import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";


const generateGetGlobalContextFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "get_global_context",
        functionBody: `  global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
    
    $charset = get_bloginfo( 'charset' );
    $title = wp_title('|', false);
    $body_class = get_body_class();
    $site_name = get_bloginfo( 'name' );
    $site_description = get_bloginfo( 'description' );

    return compact('charset', 'title', 'body_class', 'site_name', 'site_description', 'posts', 'post', 'wp_did_header', 'wp_query', 'wp_rewrite', 'wpdb', 'wp_version', 'wp', 'id', 'comment', 'user_ID');
        `
    });
};

export default generateGetGlobalContextFunctionFile;