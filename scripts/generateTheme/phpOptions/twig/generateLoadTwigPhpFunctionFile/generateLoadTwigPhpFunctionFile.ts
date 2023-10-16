import generatePhpFunctionFile from "@generateTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateLoadTwigPhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "load_twig",
        functionBody: ` global $twig;
    $loader = new \\Twig\\Loader\\FilesystemLoader(get_template_directory() . '/views');
    $twig = new \\Twig\\Environment($loader);
    
    $twig->addGlobal('wp_head', capture_wp_head());
    $twig->addGlobal('wp_footer', capture_wp_footer());
    $twig->addGlobal('language_attributes', get_language_attributes());
    $twig->addGlobal('charset', get_bloginfo( 'charset' ));
    $twig->addGlobal('title', wp_title('|', false));
    $twig->addGlobal('body_class', get_body_class());
    $twig->addGlobal('site_name', get_bloginfo( 'name' ));
    $twig->addGlobal('site_description', get_bloginfo( 'description' ));
    `
    });
};

export default generateLoadTwigPhpFunctionFile;