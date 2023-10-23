import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupTwigPhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_twig",
        functionBody: ` global $twig, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_versions, $wp, $id, $user_ID;
    $loader = new \\Twig\\Loader\\FilesystemLoader(get_template_directory() . '/views');
    $twig = new \\Twig\\Environment($loader, [
        'debug' => WP_DEBUG
    ]);
    
    $twig->addGlobal('wp_head', capture_wp_head());
    $twig->addGlobal('wp_footer', capture_wp_footer());
    $twig->addGlobal('language_attributes', get_language_attributes());
    $twig->addGlobal('charset', get_bloginfo( 'charset' ));
    $twig->addGlobal('title', wp_title('|', false));
    $twig->addGlobal('body_class', get_body_class());
    $twig->addGlobal('site_name', get_bloginfo( 'name' ));
    $twig->addGlobal('site_description', get_bloginfo( 'description' ));

    if(WP_DEBUG) {
        $twig->addExtension(new \\Twig\\Extension\\DebugExtension());
    }
    `
    });
};

export default generateSetupTwigPhpFunctionFile;