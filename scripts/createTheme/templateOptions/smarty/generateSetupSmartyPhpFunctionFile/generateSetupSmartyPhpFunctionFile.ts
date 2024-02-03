import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupSmartyPhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_smarty",
        functionBody: `  global $views, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
        $views = new \\Smarty\\Smarty();
        $views->setTemplateDir(get_template_directory() . '/views/views');
        $views->setConfigDir(get_template_directory() . '/views/config');
        $views->setCompileDir(get_template_directory() . '/views/compile');
        $views->setCacheDir(get_template_directory() . '/views/cache');
        $views->testInstall();
        
        $views->assign('wp_head', capture_wp_head());
        $views->assign('wp_footer', capture_wp_footer());
        $views->assign('language_attributes', get_language_attributes());
        $views->assign('charset', get_bloginfo( 'charset' ));
        $views->assign('title', wp_title('|', false));
        $views->assign('body_class', implode(' ', get_body_class()));
        $views->assign('site_name', get_bloginfo( 'name' ));
        $views->assign('site_description', get_bloginfo( 'description' ));
        $views->assign('wp_did_header', $wp_did_header);
        $views->assign('wp_query', $wp_query);
        $views->assign('wp_rewrite', $wp_rewrite);
        $views->assign('wpdb', $wpdb);
        $views->assign('wp_version', $wp_version);
        $views->assign('wp', $wp);
        $views->assign('id', $id);
        $views->assign('comment', $comment);
        $views->assign('user_ID', $user_ID);`
    })
};

export default generateSetupSmartyPhpFunctionFile;