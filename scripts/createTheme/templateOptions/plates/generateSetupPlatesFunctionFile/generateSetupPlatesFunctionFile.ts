import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupPlatesFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_plates",
        functionBody: ` global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
    $views = new League\\Plates\\Engine(get_template_directory() . '/views');
    $views->addData([
        'wp_head' => capture_wp_head(),
        'wp_footer' => capture_wp_footer(),
        'language_attributes' => get_language_attributes(),
        'charset' => get_bloginfo( 'charset' )),
        'title' => wp_title('|', false)),
        'body_class' => get_body_class()),
        'site_name' => get_bloginfo( 'name' )),
        'site_description' => get_bloginfo( 'description' )),
        'posts' => $posts,
        'post' => $post,
        'wp_did_header' => $wp_did_header,
        'wp_query' => $wp_query,
        'wp_rewrite' => $wp_rewrite,
        'wpdb' => $wpdb,
        'wp_version' => $wp_version,
        'wp' => $wp,
        'id' => $id,
        'comment' => $comment,
        'user_ID' => $user_ID
    ]);
    `
    });
};

export default generateSetupPlatesFunctionFile;