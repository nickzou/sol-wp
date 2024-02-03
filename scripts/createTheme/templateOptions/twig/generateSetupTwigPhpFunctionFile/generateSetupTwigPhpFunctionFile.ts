import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupTwigPhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_twig",
        functionBody: `  global $views, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
    $loader = new \\Twig\\Loader\\FilesystemLoader(get_template_directory() . '/views');
    $views = new \\Twig\\Environment($loader, [
        'debug' => WP_DEBUG
    ]);
    
    $views->addGlobal('wp_head', capture_wp_head());
    $views->addGlobal('wp_footer', capture_wp_footer());
    $views->addGlobal('language_attributes', get_language_attributes());
    $views->addGlobal('charset', get_bloginfo( 'charset' ));
    $views->addGlobal('title', wp_title('|', false));
    $views->addGlobal('body_class', get_body_class());
    $views->addGlobal('site_name', get_bloginfo( 'name' ));
    $views->addGlobal('site_description', get_bloginfo( 'description' ));
    $views->addGlobal('posts', $posts);
    $views->addGlobal('post', $post);
    $views->addGlobal('wp_did_header', $wp_did_header);
    $views->addGlobal('wp_query', $wp_query);
    $views->addGlobal('wp_rewrite', $wp_rewrite);
    $views->addGlobal('wpdb', $wpdb);
    $views->addGlobal('wp_version', $wp_version);
    $views->addGlobal('wp', $wp);
    $views->addGlobal('id', $id);
    $views->addGlobal('comment', $comment);
    $views->addGlobal('user_ID', $user_ID);

    $get_permalink = new \\Twig\\TwigFunction('get_permalink', function($postId) {
        return get_permalink($postId);
    });

    $views->addFunction($get_permalink);

    if(WP_DEBUG) {
        $views->addExtension(new \\Twig\\Extension\\DebugExtension());
    }
    `
    });
};

export default generateSetupTwigPhpFunctionFile;